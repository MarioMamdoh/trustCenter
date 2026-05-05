import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeesService } from '../../services/emplyees.service';
import {
  UserRole,
  EmployeeDepartment,
} from '../../models/constant/employee';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface PeriodicElement {
  fullName: string;
  position: number;
  area: string;
  role: string;
}
@Component({
  selector: 'app-roles',
  imports: [
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  emplyessService = inject(EmployeesService);
  ELEMENT_DATA: any[] = [];
  displayedColumns: string[] = [
    'position',
    'fullName',
    'area',
    'role',
    'actions',
  ];
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);

  roles = Object.values(UserRole);
  areas = Object.values(EmployeeDepartment);

  selectedCategory: string = '';
  selectedArea: string = '';
  selectedRole: string = '';
  searchText: string = '';

  editingRow: number | null = null;
  editRoleValue: string = '';

  ngOnInit(): void {
    this.emplyessService.getAll().subscribe((data) => {
      let serviceIndex = 1;
      this.ELEMENT_DATA = data.map((user: any) => ({
        id: user._id || user.id,
        fullName: user.fullName,
        position: serviceIndex++,
        area: user.area,
        role: user.role,
      }));
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  onCategoryChange() {
    this.selectedArea = '';
    this.selectedRole = '';
    this.searchText = '';
    this.applyFilters();
  }

  applyFilters() {
    let filtered = this.ELEMENT_DATA;
    switch (this.selectedCategory) {
      case 'area':
        filtered = filtered.filter(
          (e) => !this.selectedArea || e.area === this.selectedArea
        );
        break;
      case 'role':
        filtered = filtered.filter(
          (e) => !this.selectedRole || e.role === this.selectedRole
        );
        break;
      case 'area&role':
        filtered = filtered.filter(
          (e) =>
            (!this.selectedArea || e.area === this.selectedArea) &&
            (!this.selectedRole || e.role === this.selectedRole)
        );
        break;
      case 'name':
        filtered = filtered.filter(
          (e) =>
            !this.searchText ||
            e.fullName.toLowerCase().includes(this.searchText.toLowerCase())
        );
        break;
      default:
        // No filter
        break;
    }
    this.dataSource.data = filtered;
  }

  onNameInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchText = input.value;
    this.applyFilters();
  }

  startEdit(row: any) {
    this.editingRow = row.position;
    this.editRoleValue = row.role;
  }

  saveRole(row: any) {
    if (this.editRoleValue && row.role !== this.editRoleValue) {
      this.emplyessService
        .update({ role: this.editRoleValue }, row.id)
        .subscribe(() => {
          row.role = this.editRoleValue;
          this.editingRow = null;
          this.applyFilters();
        });
    } else {
      this.editingRow = null;
    }
  }

  cancelEdit() {
    this.editingRow = null;
  }
}
