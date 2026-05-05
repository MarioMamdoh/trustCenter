import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BedDetailsService } from '../../services/bed-details.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AreaService } from '../../services/area.service';

export interface PeriodicElement {
  bedNumber: string;
  position: number;
  paid: number;
  area: string;
  date: string;
  customer: string;
}

@Component({
  selector: 'app-beds-details',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './beds-details.component.html',
  styleUrl: './beds-details.component.scss',
})
export class BedsDetailsComponent {
  bedDetailsService = inject(BedDetailsService);
  areaService = inject(AreaService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'position',
    'bedNumber',
    'area',
    'customer',
    'paid',
    'date',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  // Filter properties
  selectedCategory: string = '';
  searchText: string = '';
  areas: any[] = [];
  selectedArea: string = '';

  ngOnInit(): void {
    this.loadAreas();
    this.loadBedsData();
  }

  loadAreas() {
    this.areaService.getAll().subscribe((areas) => {
      this.areas = areas;
    });
  }

  loadBedsData() {
    this.bedDetailsService.getAllBedsDetails().subscribe((data) => {
      this.ELEMENT_DATA = []; // Clear existing data
      let serviceIndex = 1;
      // Sort data by date in descending order (newest first)
      const sortedData = [...data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      sortedData.forEach((data: any) => {
        this.ELEMENT_DATA.push({
          position: serviceIndex++,
          bedNumber: data.bedInfo.numberOfBed,
          paid: data.paid,
          area: data.bedInfo.area,
          date: data.createdAt,
          customer: data.customerInfo.fullName,
        });
      });
      this.dataSource.data = this.ELEMENT_DATA;
    });
  }

  onCategoryChange() {
    this.selectedArea = '';
    this.searchText = '';
    this.dataSource.data = this.ELEMENT_DATA;
  }

  filterData(value: any) {
    if (!this.selectedCategory) {
      this.dataSource.data = this.ELEMENT_DATA;
      return;
    }

    switch (this.selectedCategory) {
      case 'area':
        this.dataSource.data = this.ELEMENT_DATA.filter(
          (item) => !value || item.area === value
        );
        break;
      case 'name':
        this.dataSource.data = this.ELEMENT_DATA.filter(
          (item) =>
            !value || item.customer.toLowerCase().includes(value.toLowerCase())
        );
        break;
      case 'bedAndArea':
        this.applyBedAndAreaFilter();
        break;
    }
  }

  // Add this method to handle the combined filter
  applyBedAndAreaFilter() {
    let filteredData = [...this.ELEMENT_DATA];

    // Apply area filter if selected
    if (this.selectedArea) {
      filteredData = filteredData.filter(
        (item) => item.area === this.selectedArea
      );
    }

    // Apply bed number filter if there's search text
    if (this.searchText) {
      filteredData = filteredData.filter((item) =>
        item.bedNumber.toString().includes(this.searchText.trim())
      );
    }

    this.dataSource.data = filteredData;
  }
}
