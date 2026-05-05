import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
export interface PeriodicElement {
  id: string;
  fullName: string;
  position: number;
  age: number;
  phone: string;
  area: string;
}
@Component({
  selector: 'app-edit-customer',
  imports: [MatTableModule, RouterLink],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss',
})
export class EditCustomerComponent {
  toastr = inject(ToastrService);
  customersService = inject(CustomersService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'position',
    'fullName',
    'age',
    'area',
    'phone',
    'edit',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.loadCustomer();
  }
  loadCustomer() {
    this.customersService.getAll().subscribe((data) => {
      this.ELEMENT_DATA = [];
      let serviceIndex = 1;
      data.forEach((user: any) => {
        this.ELEMENT_DATA.push({
          id: user._id,
          fullName: user.fullName,
          position: serviceIndex++,
          age: user.age,
          area: user.area,
          phone: user.phone,
        });
        this.dataSource.data = this.ELEMENT_DATA;
      });
    });
  }
  getElementById(element: any) {
    const customerId = element.id;
    return customerId;
  }
  onEdit() {
    return (this.customersService.editMode = true);
  }
  deleteEmployee(element: any) {
    this.customersService.delete(element.id).subscribe((data) => {
      this.toastr.success(`Customer deleted successfully`);
      this.loadCustomer();
    });
  }
}
