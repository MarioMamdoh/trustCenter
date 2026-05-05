import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmployeesService } from '../../services/emplyees.service';
import { EmployeeDepartment } from '../../models/constant/employee';
export interface PeriodicElement {
  fullName: string;
  position: number;
  age: number;
  salary: number;
  detuction: number;
  totalSalary: number;
  area: string;
  department: EmployeeDepartment;
}
@Component({
  selector: 'app-all-employees',
  imports: [MatTableModule],
  templateUrl: './all-employees.component.html',
  styleUrl: './all-employees.component.scss',
})
export class AllEmployeesComponent implements OnInit {
  emplyessService = inject(EmployeesService);
  ELEMENT_DATA: PeriodicElement[] = [];
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
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  ngOnInit(): void {
    this.emplyessService.getAll().subscribe((data) => {
      let serviceIndex = 1;
      data.forEach((user: any) => {
        this.ELEMENT_DATA.push({
          fullName: user.fullName,
          position: serviceIndex++,
          age: user.age,
          salary: user.salary,
          detuction:
            user.deduction === Infinity || user.deduction === 0
              ? 0
              : Math.floor(user.deduction / (user.salary / 30 / 8)),
          totalSalary: user.totalSalary,
          area: user.area,
          department: user.department,
        });
        this.dataSource.data = this.ELEMENT_DATA;
      });
    });
  }
}
