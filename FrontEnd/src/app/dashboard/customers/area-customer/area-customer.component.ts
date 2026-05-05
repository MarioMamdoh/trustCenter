import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AreaService } from '../../services/area.service';
import { CustomersService } from '../../services/customers.service';
import { Customer } from '../../models/constant/customer';

@Component({
  selector: 'app-area-customer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './area-customer.component.html',
  styleUrl: './area-customer.component.scss',
})
export class AreaCustomerComponent implements OnInit {
  selectedCategory: string = '';
  areas: any[] = [];
  searchText: string = '';
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  selectedArea: string = '';

  displayedColumns: string[] = [
    'position',
    'fullName',
    'age',
    'area',
    'phone',
    'additional',
  ];

  constructor(
    private areaService: AreaService,
    private customersService: CustomersService
  ) {}

  ngOnInit() {
    this.loadAreas();
    this.loadCustomers();
  }

  loadAreas() {
    this.areaService.getAll().subscribe((areas) => {
      this.areas = areas;
    });
  }

  loadCustomers() {
    this.customersService.getAll().subscribe((customers) => {
      this.customers = customers;
      this.filteredCustomers = customers;
    });
  }

  onCategoryChange() {
    this.selectedArea = '';
    this.searchText = '';

    if (!this.selectedCategory) {
      this.filteredCustomers = this.customers;
    }
  }

  filterCustomers(value: string) {
    if (!this.selectedCategory) {
      this.filteredCustomers = this.customers;
      return;
    }

    if (!value) {
      this.filteredCustomers = this.customers;
      return;
    }

    switch (this.selectedCategory) {
      case 'area':
        this.filteredCustomers = this.customers.filter(
          (customer) => !value || customer.area === value
        );
        break;
      case 'name':
        this.filteredCustomers = this.customers.filter((customer) =>
          !value || customer.fullName.toLowerCase().includes(value.toLowerCase())
        );
        break;
    }
  }
}
