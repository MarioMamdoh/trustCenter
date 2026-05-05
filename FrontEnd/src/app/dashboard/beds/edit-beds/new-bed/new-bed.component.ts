import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AreaService } from '../../../services/area.service';
import { BedsService } from '../../../services/beds.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-bed',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-bed.component.html',
  styleUrl: './new-bed.component.scss',
})
export class NewBedComponent implements OnInit {
  formStatus = 'Adding New';
  bedForm!: FormGroup;
  areas: any[] = [];
  existingBeds: any[] = [];
  toaster = inject(ToastrService);
  router = inject(Router);
  formEditing: any;
  routerActive = inject(ActivatedRoute);

  constructor(
    private fb: FormBuilder,
    private areaService: AreaService,
    private bedService: BedsService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadAreas();
    this.loadExistingBeds();
  }

  private initForm() {
    if (this.bedService.editMode === true) {
      this.routerActive.queryParams.subscribe({
        next: (val) => {
          this.formStatus = 'Editing';
          this.bedService.getById(val['id']).subscribe((data) => {
            this.formEditing = data;
            this.bedForm = this.fb.group({
              bedNumber: [this.formEditing.numberOfBed, [Validators.required]],
              area: [this.formEditing.area, [Validators.required]],
            });
            this.bedForm.get('bedNumber')?.valueChanges.subscribe(() => {
              this.validateBedInArea();
            });

            this.bedForm.get('area')?.valueChanges.subscribe(() => {
              this.validateBedInArea();
            });
          });
        },
      });
    }
    this.bedForm = this.fb.group({
      bedNumber: ['', [Validators.required]],
      area: ['', [Validators.required]],
    });

    // Add validators when either bedNumber or area changes
    this.bedForm.get('bedNumber')?.valueChanges.subscribe(() => {
      this.validateBedInArea();
    });

    this.bedForm.get('area')?.valueChanges.subscribe(() => {
      this.validateBedInArea();
    });
  }

  private validateBedInArea() {
    const bedNumber = this.bedForm.get('bedNumber')?.value;
    const selectedArea = this.bedForm.get('area')?.value;

    if (bedNumber && selectedArea) {
      const bedExists = this.existingBeds.some(
        (bed) => bed.numberOfBed === +bedNumber && bed.area === selectedArea
      );

      if (bedExists) {
        this.bedForm.get('bedNumber')?.setErrors({ bedExistsInArea: true });
      } else {
        // Only clear the bedExistsInArea error, keep other errors if they exist
        const currentErrors = this.bedForm.get('bedNumber')?.errors;
        if (currentErrors) {
          delete currentErrors['bedExistsInArea'];
          if (Object.keys(currentErrors).length === 0) {
            this.bedForm.get('bedNumber')?.setErrors(null);
          } else {
            this.bedForm.get('bedNumber')?.setErrors(currentErrors);
          }
        }
      }
    }
  }

  private loadExistingBeds() {
    this.bedService.getAll().subscribe({
      next: (beds) => {
        this.existingBeds = beds;
      },
      error: (error) => {
        console.error('Error loading beds:', error);
      },
    });
  }

  private loadAreas() {
    this.areaService.getAll().subscribe({
      next: (response) => {
        this.areas = response;
      },
      error: (error) => {
        console.error('Error loading areas:', error);
      },
    });
  }

  onSubmit() {
    if (this.bedForm.valid) {
      const bedData = {
        numberOfBed: +this.bedForm.value.bedNumber,
        area: this.bedForm.value.area,
      };
      if (this.bedService.editMode === true) {
        this.bedService.update(bedData, this.formEditing._id).subscribe({
          next: (response) => {
            this.toaster.success('Bed updated successfully!');
            this.loadExistingBeds();
            this.router.navigate(['/dashboard/edit-beds']);
          },
          error: (error) => {
            console.error('Error updating bed:', error);
            this.toaster.error('Error updating bed');
          },
        });
      } else if (this.bedService.editMode === false) {
        this.bedService.create(bedData).subscribe({
          next: (response) => {
            this.toaster.success('Bed created successfully!');
            this.loadExistingBeds();
            this.router.navigate(['/dashboard/edit-beds']);
          },
          error: (error) => {
            console.error('Error creating bed:', error);
            this.toaster.error('Error creating bed');
          },
        });
      }
      this.resetForm();
    }
  }

  resetForm() {
    this.bedForm.reset();
  }
}
