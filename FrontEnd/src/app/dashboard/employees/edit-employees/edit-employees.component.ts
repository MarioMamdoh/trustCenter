import { Component, inject } from '@angular/core';
import { EmployeeDepartment } from '../../models/constant/employee';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeesService } from '../../services/emplyees.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
export interface PeriodicElement {
  id: string;
  fullName: string;
  position: number;
  age: number;
  area: string;
  department: EmployeeDepartment;
}
@Component({
  selector: 'app-edit-employees',
  imports: [MatTableModule, RouterLink],
  templateUrl: './edit-employees.component.html',
  styleUrl: './edit-employees.component.scss',
})
export class EditEmployeesComponent {
  toastr = inject(ToastrService);
  emplyessService = inject(EmployeesService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'position',
    'fullName',
    'age',
    'area',
    'department',
    'edit',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  ngOnInit(): void {
    this.loadEmployee();
  }
  loadEmployee() {
    this.emplyessService.getAll().subscribe({
      next: (data) => {
        this.ELEMENT_DATA = [];
        let serviceIndex = 1;
        data.forEach((user: any) => {
          this.ELEMENT_DATA.push({
            id: user._id,
            fullName: user.fullName,
            position: serviceIndex++,
            age: user.age,
            area: user.area,
            department: user.department,
          });
        });
        this.dataSource.data = this.ELEMENT_DATA;
      },
      error: (error) => {
        console.error('Error loading services:', error);
      },
    });
  }
  deleteEmployee(element: any) {
    this.emplyessService.delete(element.id).subscribe((data) => {
      this.toastr.success(`Employee deleted successfully`);
      this.loadEmployee();
    });
  }
  getElementById(element: any) {
    const employeeId = element.id;
    return employeeId;
  }
  onEdit() {
    return (this.emplyessService.editMode = true);
  }
}
