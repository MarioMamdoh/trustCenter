import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OffersService } from '../../../services/offers.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-offer',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './new-offer.component.html',
  styleUrl: './new-offer.component.scss',
})
export class NewOfferComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  offerId = '';
  formStatus = 'Adding New';
  router = inject(Router);
  routerActive = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  offersService = inject(OffersService);
  offerForm: FormGroup;
  postEditing: any;
  editMode = this.offersService.editMode;

  constructor(private fb: FormBuilder) {
    if (this.offersService.editMode === true) {
      this.routerActive.queryParams
        .pipe(takeUntil(this.destroy$))
        .subscribe((val) => {
          this.offerId = val['id'];
          this.offersService
            .getById(this.offerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
              this.postEditing = val;

              this.offerForm = this.fb.group({
                nameEn: [
                  this.postEditing.offerName?.en ||
                    this.postEditing.offerName ||
                    '',
                  [Validators.required],
                ],
                nameAr: [
                  this.postEditing.offerName?.ar || '',
                  [Validators.required],
                ],
                contentEn: [
                  this.postEditing.contentOfOffer?.en ||
                    this.postEditing.contentOfOffer ||
                    '',
                  [Validators.required],
                ],
                contentAr: [
                  this.postEditing.contentOfOffer?.ar || '',
                  [Validators.required],
                ],
                percentage: [
                  this.postEditing.percentageOfOffer || '',
                  [Validators.required, Validators.min(0), Validators.max(100)],
                ],
                startOfferDate: [
                  this.postEditing.startOfferDate || '',
                  [Validators.required],
                ],
                endOfferDate: [
                  this.postEditing.endOfferDate || '',
                  [Validators.required],
                ],
              });

              this.formStatus = 'Editing';
              this.offersService
                .update(this.postEditing, this.offerId)
                .pipe(takeUntil(this.destroy$))
                .subscribe((_val) => {});
            });
        });
    }

    this.offerForm = this.fb.group({
      nameEn: ['', [Validators.required]],
      nameAr: ['', [Validators.required]],
      contentEn: ['', [Validators.required]],
      contentAr: ['', [Validators.required]],
      percentage: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      startOfferDate: ['', [Validators.required]],
      endOfferDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // No editor initialization needed
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Check if form is valid
  isFormValid(): boolean {
    return this.offerForm.valid;
  }

  onSubmit() {
    if (!this.isFormValid()) {
      this.toaster.error('Please fill all required fields');
      return;
    }

    // Get form values
    const formValues = this.offerForm.value;

    // Check if date fields are empty
    if (!formValues.startOfferDate || !formValues.endOfferDate) {
      this.toaster.error('Start date and end date are required');
      return;
    }

    // Validate dates
    const startDate = new Date(formValues.startOfferDate);
    const endDate = new Date(formValues.endOfferDate);

    if (startDate >= endDate) {
      this.toaster.error('End date must be after start date');
      return;
    }

    // Convert dates to strings and ensure they're not empty
    const startOfferDateStr = formValues.startOfferDate
      ? formValues.startOfferDate.toString()
      : '';
    const endOfferDateStr = formValues.endOfferDate
      ? formValues.endOfferDate.toString()
      : '';

    const offerData: any = {
      offerName: {
        en: formValues.nameEn,
        ar: formValues.nameAr,
      },
      contentOfOffer: {
        en: formValues.contentEn,
        ar: formValues.contentAr,
      },
      percentageOfOffer: formValues.percentage,
      startOfferDate: startOfferDateStr,
      endOfferDate: endOfferDateStr,
    };

    if (this.offersService.editMode === false) {
      this.offersService
        .create(offerData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (createResponse) => {
            this.toaster.success('Offer created successfully!');
            this.resetForm();
            this.router.navigate(['/dashboard/ui-elements/offers']);
          },
          error: (createError) => {
            console.error('Error creating offer:', createError);
            this.toaster.error('Error creating offer. Please try again.');
          },
        });
    } else if (this.offersService.editMode === true) {
      this.routerActive.queryParams
        .pipe(takeUntil(this.destroy$))
        .subscribe((val) => {
          this.offerId = val['id'];
          this.offersService
            .getById(this.offerId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (val) => {
                this.offersService
                  .update(offerData, this.offerId)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe({
                    next: (_updateResponse) => {
                      this.toaster.success('Offer updated successfully!');
                      this.resetForm();
                      this.router.navigate(['/dashboard/ui-elements/offers']);
                    },
                    error: (updateError) => {
                      console.error('Error updating offer:', updateError);
                      this.toaster.error(
                        'Error updating offer. Please try again.'
                      );
                    },
                  });
              },
            });
        });
    }
  }

  resetForm() {
    this.offerForm.reset();
  }
}
