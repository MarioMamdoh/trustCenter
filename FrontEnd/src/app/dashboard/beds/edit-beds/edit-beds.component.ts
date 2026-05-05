import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BedsService } from '../../services/beds.service';
export interface PeriodicElement {
  id: string;
  name: string;
  position: number;
  area: string;
}
@Component({
  selector: 'app-edit-beds',
  imports: [RouterLink, MatTableModule],
  templateUrl: './edit-beds.component.html',
  styleUrl: './edit-beds.component.scss',
})
export class EditBedsComponent {
  toastr = inject(ToastrService);
  bedsService = inject(BedsService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['position', 'name', 'area', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  ngOnInit() {
    this.loadServices();
  }
  loadServices() {
    this.bedsService.getAll().subscribe({
      next: (services) => {
        this.ELEMENT_DATA = [];
        let serviceIndex = 1;
        services.forEach((service: any) => {
          this.ELEMENT_DATA.push({
            position: serviceIndex++,
            name: service['numberOfBed'],
            area: service['area'],
            id: service['_id'], // Include the service ID
          });
        });
        this.dataSource.data = this.ELEMENT_DATA; // Update the dataSource
      },
      error: (error) => {
        console.error('Error loading services:', error);
      },
    });
  }
  deleteService(element: any) {
    const serviceId = element.id;

    this.bedsService.delete(serviceId).subscribe({
      next: (data) => {
        this.toastr.success('Service deleted successfully', 'Success!');
        this.loadServices();
      },
    });
  }
  onEdit() {
    return (this.bedsService.editMode = true);
  }
  onAdding() {
    return (this.bedsService.editMode = false);
  }
  getElementById(element: any) {
    const serviceId = element.id;
    return serviceId;
  }
}
