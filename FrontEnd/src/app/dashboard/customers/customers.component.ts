import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomersService } from '../services/customers.service';

@Component({
  selector: 'app-customers',
  imports: [RouterLink],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  customerService = inject(CustomersService);
  onAdd() {
    return (this.customerService.editMode = false);
  }
}
