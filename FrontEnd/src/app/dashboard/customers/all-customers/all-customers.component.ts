import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';

export interface PeriodicElement {
  fullName: string;
  position: number;
  age: number;
  phone: string;
  additional: string;
  area: string;
}
@Component({
  selector: 'app-all-customers',
  imports: [MatTableModule],
  templateUrl: './all-customers.component.html',
  styleUrl: './all-customers.component.scss',
})
export class AllCustomersComponent {
  customersService = inject(CustomersService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'position',
    'fullName',
    'age',
    'area',
    'phone',
    'additional',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  ngOnInit(): void {
    this.customersService.getAll().subscribe((data) => {
      let serviceIndex = 1;
      data.forEach((user: any) => {
        this.ELEMENT_DATA.push({
          fullName: user.fullName,
          position: serviceIndex++,
          age: user.age,
          area: user.area,
          additional: user.additional,
          phone: user.phone,
        });
        this.dataSource.data = this.ELEMENT_DATA;
      });
    });
  }
}
