import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  EmployeeDepartment,
  EMPLOYEE,
  UserRole,
} from '../../models/constant/employee';
import { EmployeesService } from '../../services/emplyees.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-new-employees',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-employees.component.html',
  styleUrl: './new-employees.component.scss',
})
export class NewEmployeesComponent {
  route = inject(Router);
  toastr = inject(ToastrService);
  routerActive = inject(ActivatedRoute);
  employeeService = inject(EmployeesService);
  areaService = inject(AreaService);
  employeeDepartment = EmployeeDepartment;
  employeeForm: FormGroup = this.fb.group({});
  formEditing: any;
  areas: any[] = [];
  departments: EmployeeDepartment[] = [
    this.employeeDepartment.ADMINISTRATION,
    this.employeeDepartment.CUSTOMER_SERVICE,
    this.employeeDepartment.DOCTOR,
    this.employeeDepartment.FINANCE,
    this.employeeDepartment.IT,
    this.employeeDepartment.MANAGER,
    this.employeeDepartment.MEDICAL,
    this.employeeDepartment.NURSING,
    this.employeeDepartment.RECEPTION,
    this.employeeDepartment.SALES,
  ];

  constructor(private fb: FormBuilder) {
    this.loadAreas();

    // Initialize form with all controls immediately
    this.employeeForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required],
      area: ['', Validators.required],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      deduction: ['', Validators.required],
    });

    if (this.employeeService.editMode === true) {
      this.routerActive.queryParams.subscribe({
        next: (val) => {
          this.employeeService.getById(val['id']).subscribe((data) => {
            this.formEditing = data;
            // Update form values with existing data
            this.employeeForm.patchValue({
              fullName: this.formEditing.fullName,
              age: this.formEditing.age,
              salary: this.formEditing.salary,
              area: this.formEditing.area,
              department: this.formEditing.department,
              email: this.formEditing.email,
              deduction: this.formEditing.deduction,
            });

            // Remove password control in edit mode
            this.employeeForm.removeControl('password');
          });
        },
      });
    }
  }

  private loadAreas() {
    this.areaService.getAll().subscribe({
      next: (response) => {
        this.areas = response;
      },
      error: (error) => {
        console.error('Error loading areas:', error);
      },
    });
  }

  onSubmit(): void {
    const employeeData: EMPLOYEE = {
      fullName: this.employeeForm.value.fullName,
      age: +this.employeeForm.value.age,
      salary: +this.employeeForm.value.salary,
      area: this.employeeForm.value.area,
      department: this.employeeForm.value.department,
      role: UserRole.TEAM_USER,
      image: 'image',
      email: this.employeeForm.value.email,
      password: this.employeeForm.value.password,
      deduction:
        Math.floor(
          (this.employeeForm.value.salary / 30 / 8) *
            this.employeeForm.value.deduction
        ) || 0,
    };
    if (this.employeeService.editMode === true) {
      this.employeeService
        .update(employeeData, this.formEditing._id)
        .subscribe((data) => {
          this.toastr.success('Employee updated successfully');
          this.route.navigate(['/dashboard/employees']);
        });
    } else if (this.employeeService.editMode === false) {
      this.employeeService.create(employeeData).subscribe((data) => {
        this.toastr.success('Employee created successfully');
        this.route.navigate(['/dashboard/employees']);
      });
    }

    this.employeeForm.reset();
  }
}
