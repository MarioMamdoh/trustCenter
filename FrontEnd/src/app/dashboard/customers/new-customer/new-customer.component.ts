import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/constant/customer';
import { CommonModule } from '@angular/common';
import { AreaService } from '../../services/area.service';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.scss',
})
export class NewCustomerComponent {
  route = inject(Router);
  toastr = inject(ToastrService);
  routerActive = inject(ActivatedRoute);
  customerService = inject(CustomersService);
  areaService = inject(AreaService);
  customerForm: FormGroup;
  formEditing: any;
  areas: any[] = [];

  constructor(private fb: FormBuilder) {
    this.loadAreas();
    if (this.customerService.editMode === true) {
      this.routerActive.queryParams.subscribe({
        next: (val) => {
          this.customerService.getById(val['id']).subscribe((data) => {
            this.formEditing = data;
            this.customerForm = fb.group({
              fullName: this.formEditing.fullName,
              age: this.formEditing.age,
              phone: this.formEditing.phone,
              area: this.formEditing.area,
              additional: this.formEditing.additional,
            });
          });
        },
      });
    }
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', Validators.required],
      phone: ['', Validators.required],
      area: ['', Validators.required],
      additional: ['', Validators.required],
    });
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
    const customerData: Customer = {
      fullName: this.customerForm.value.fullName,
      age: +this.customerForm.value.age,
      area: this.customerForm.value.area,
      phone: this.customerForm.value.phone,
      additional: this.customerForm.value.additional,
    };
    if (this.customerService.editMode === true) {
      this.customerService
        .update(customerData, this.formEditing._id)
        .subscribe((data) => {
          this.toastr.success('Customer updated successfully');
          this.route.navigate(['/dashboard/customers']);
        });
    } else if (this.customerService.editMode === false) {
      this.customerService.create(customerData).subscribe((data) => {
        this.toastr.success('Customer created successfully');
        this.route.navigate(['/dashboard/customers']);
      });
    }

    this.customerForm.reset();
  }
}
