import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { BedsService } from '../services/beds.service';
import { AreaService } from '../services/area.service';
import { CustomersService } from '../services/customers.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BedDetailsService } from '../services/bed-details.service';

@Component({
  selector: 'app-beds',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatAutocompleteModule,
  ],
  templateUrl: './beds.component.html',
  styleUrl: './beds.component.scss',
})
export class BedsComponent implements OnInit {
  beds: any[] = [];
  areas: any[] = [];
  customers: any[] = [];
  filteredCustomers!: Observable<any[]>;
  bedsByArea: { [key: string]: any[] } = {};
  reservationForm!: FormGroup;
  selectedBed: any = null;
  showReservationForm = false;

  constructor(
    private bedsService: BedsService,
    private areaService: AreaService,
    private customersService: CustomersService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private BedDetailsService: BedDetailsService
  ) {}

  ngOnInit() {
    this.loadBeds();
    this.loadAreas();
    this.loadCustomers();
    this.initForm();
  }

  private initForm() {
    this.reservationForm = this.fb.group({
      bedNumber: ['', Validators.required],
      customerName: ['', Validators.required],
      customerId: ['', Validators.required],
      paid: [0, [Validators.required, Validators.min(0)]],
    });

    this.filteredCustomers = this.reservationForm
      .get('customerName')!
      .valueChanges.pipe(
        startWith(''),
        map((value) => this._filterCustomers(value))
      );
  }

  private _filterCustomers(value: string): any[] {
    const filterValue = value;
    return this.customers.filter((customer) =>
      customer.fullName.toLowerCase().includes(filterValue)
    );
  }

  private loadBeds() {
    this.bedsService.getAll().subscribe({
      next: (beds) => {
        this.beds = beds;
        this.organizeBedsByArea();
      },
      error: (error) => {
        console.error('Error loading beds:', error);
        this.toastr.error('Error loading beds');
      },
    });
  }

  private loadAreas() {
    this.areaService.getAll().subscribe({
      next: (areas) => {
        this.areas = areas;
      },
      error: (error) => {
        console.error('Error loading areas:', error);
        this.toastr.error('Error loading areas');
      },
    });
  }

  private loadCustomers() {
    this.customersService.getAll().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
        this.toastr.error('Error loading customers');
      },
    });
  }

  private organizeBedsByArea() {
    this.bedsByArea = {};
    this.beds.forEach((bed) => {
      if (!this.bedsByArea[bed.area]) {
        this.bedsByArea[bed.area] = [];
      }
      this.bedsByArea[bed.area].push(bed);
    });
  }

  onBedClick(bed: any) {
    if (bed.isReserved) {
      this.selectedBed = bed;
      this.reservationForm.patchValue({
        bedNumber: bed.numberOfBed,
        customerName: '',
        customerId: '',
      });
      this.showReservationForm = true;
    } else if (bed.isReserved === false) {
      this.bedsService
        .updateReservationStatus(bed._id)
        .subscribe((data) => (bed.isReserved = true));
    }
  }

  onCustomerSelect(customer: any) {
    this.reservationForm.patchValue({
      customerName: customer.fullName,
      customerId: customer._id,
    });
  }

  onSubmitReservation() {
    if (this.reservationForm.valid && this.selectedBed) {
      const bedDetailsData = {
        bedInfo: this.selectedBed._id,
        customerInfo: this.reservationForm.value.customerId,
        paid: this.reservationForm.value.paid,
      };
      const updatedBed = {
        ...this.selectedBed,
        isReserved: false,
        customerId: null,
        paid: this.reservationForm.value.paid,
      };

      this.bedsService.update(updatedBed, this.selectedBed._id).subscribe({
        next: () => {
          this.BedDetailsService.createBedDetails(bedDetailsData).subscribe(
            (data) => {}
          );
          this.toastr.success('Bed reservation removed successfully');
          this.loadBeds();
          this.showReservationForm = false;
          this.selectedBed = null;
          this.reservationForm.reset();
        },
        error: (error) => {
          console.error('Error updating bed:', error);
          this.toastr.error('Error updating bed reservation');
        },
      });
    }
  }

  closeForm() {
    this.showReservationForm = false;
    this.selectedBed = null;
    this.reservationForm.reset();
  }
}
