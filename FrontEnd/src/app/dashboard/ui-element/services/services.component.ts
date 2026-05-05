import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { ToastrService } from 'ngx-toastr';
export interface PeriodicElement {
  id: string;
  title: string;
  position: number;
  summary: string;
  image: string;
}

@Component({
  selector: 'app-services',
  imports: [MatTableModule, RouterLink],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  toastr = inject(ToastrService);
  serviceService = inject(ServiceService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['position', 'title', 'summary', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  ngOnInit() {
    this.loadServices();
  }
  loadServices() {
    this.serviceService.getAll().subscribe({
      next: (services) => {
        this.ELEMENT_DATA = [];
        let serviceIndex = 1;
        services.forEach((service: any) => {
          this.ELEMENT_DATA.push({
            position: serviceIndex++,
            title: service['title'],
            summary: service['summary'],
            id: service['_id'], // Include the service ID
            image: service['image'],
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

    const fileId = element.image
      .slice(element.image.indexOf('/files/'), element.image.indexOf('/view?'))
      .split('/')[2];

    this.serviceService.delete(serviceId).subscribe({
      next: (data) => {
        this.toastr.success('Service deleted successfully', 'Success!');
        this.loadServices();
        this.serviceService.deleteImage(fileId).subscribe((data) => {});
      },
    });
  }
  onEdit() {
    return (this.serviceService.editMode = true);
  }
  onAdding() {
    return (this.serviceService.editMode = false);
  }
  getElementById(element: any) {
    const serviceId = element.id;
    return serviceId;
  }
}
