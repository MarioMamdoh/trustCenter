import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { AreaService } from '../../services/area.service';
import { EmployeesService } from '../../services/emplyees.service';
import {
  EmployeeDepartment,
  EMPLOYEE,
} from '../../models/constant/employee';

@Component({
  selector: 'app-area-employees',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  templateUrl: './area-employees.component.html',
  styleUrl: './area-employees.component.scss',
})
export class AreaEmployeesComponent implements OnInit {
  selectedCategory: string = '';
  areas: any[] = [];
  departments = Object.values(EmployeeDepartment);
  searchText: string = '';
  employees: EMPLOYEE[] = [];
  filteredEmployees: EMPLOYEE[] = [];
  selectedArea: string = '';
  selectedDepartment: string = '';

  displayedColumns: string[] = [
    'position',
    'fullName',
    'age',
    'area',
    'department',
    'salary',
    'detuction',
    'totalSalary',
  ];

  constructor(
    private areaService: AreaService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.loadAreas();
    this.loadEmployees();
  }

  loadAreas() {
    this.areaService.getAll().subscribe((areas) => {
      this.areas = areas;
    });
  }

  loadEmployees() {
    this.employeesService.getAll().subscribe((employees) => {
      this.employees = employees;
      this.filteredEmployees = employees;
    });
  }

  onCategoryChange() {
    this.selectedArea = '';
    this.selectedDepartment = '';
    this.searchText = '';

    if (!this.selectedCategory) {
      this.filteredEmployees = this.employees;
    }
  }

  filterEmployees(value: string) {
    if (!this.selectedCategory) {
      this.filteredEmployees = this.employees;
      return;
    }

    if (!value && this.selectedCategory !== 'area&department') {
      this.filteredEmployees = this.employees;
      return;
    }

    switch (this.selectedCategory) {
      case 'area':
        this.filteredEmployees = this.employees.filter(
          (emp) => !value || emp.area === value
        );
        break;
      case 'department':
        this.filteredEmployees = this.employees.filter(
          (emp) => !value || emp.department === value
        );
        break;
      case 'area&department':
        this.filteredEmployees = this.employees.filter(
          (emp) =>
            (!this.selectedArea || emp.area === this.selectedArea) &&
            (!this.selectedDepartment ||
              emp.department === this.selectedDepartment)
        );
        break;
      case 'name':
        this.filteredEmployees = this.employees.filter(
          (emp) =>
            !value || emp.fullName.toLowerCase().includes(value.toLowerCase())
        );
        break;
    }
  }

  onCombinedFilterChange() {
    this.filterEmployees('area&department');
  }
}
