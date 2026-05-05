import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EmployeesService } from '../services/emplyees.service';

@Component({
  selector: 'app-employees',
  imports: [RouterLink],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss',
})
export class EmployeesComponent {
  employeeService = inject(EmployeesService);
  onAdd() {
    return (this.employeeService.editMode = false);
  }
}
