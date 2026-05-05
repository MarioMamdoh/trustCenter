import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { OffersService } from '../../services/offers.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  id: string;
  name: string;
  position: number;
  content: string;
  precentage: string;
}

@Component({
  selector: 'app-offers',
  imports: [MatTableModule, RouterLink],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent implements OnInit {
  toastr = inject(ToastrService);
  offersService = inject(OffersService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = [
    'position',
    'name',
    'content',
    'precentage',
    'edit',
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.offersService.getAll().subscribe({
      next: (offers) => {
        this.ELEMENT_DATA = [];
        let offerIndex = 1;
        offers.forEach((offer: any) => {
          this.ELEMENT_DATA.push({
            position: offerIndex++,
            name: offer['offerName']['en'],
            content: offer['contentOfOffer']['en'],
            precentage: offer['percentageOfOffer'],
            id: offer['_id'],
          });
        });
        this.dataSource.data = this.ELEMENT_DATA; // Update the dataSource
      },
      error: (error) => {
        console.error('Error loading offers:', error);
      },
    });
  }

  deleteOffer(element: any) {
    const offerId = element.id;

    this.offersService.delete(offerId).subscribe({
      next: (data) => {
        this.toastr.success('Offer deleted successfully', 'Success!');
        this.loadOffers();
        this.offersService.deleteImage(offerId).subscribe((data) => {});
      },
    });
  }

  onEdit() {
    return (this.offersService.editMode = true);
  }

  onAdding() {
    return (this.offersService.editMode = false);
  }

  getElementById(element: any) {
    const offerId = element.id;
    return offerId;
  }
}
