import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { Service } from '../../../models/constant/service';
import { ServiceService } from '../../../services/service.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-service',
  imports: [ReactiveFormsModule, NgxEditorModule, NgClass],
  templateUrl: './new-service.component.html',
  styleUrl: './new-service.component.scss',
})
export class NewServiceComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  serviceId = '';
  formStatus = 'Adding New';
  router = inject(Router);
  routerActive = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  serviceService = inject(ServiceService);
  imgUrl: any = 'assets/placeholder-image.webp';
  selectedImg: any;
  editor!: Editor;
  serviceFormEn: FormGroup;
  serviceFormAr: FormGroup;
  postEditing: any;
  editMode = this.serviceService.editMode;
  language = 'en';
  imageValid = false;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  constructor(private fb: FormBuilder) {
    // Initialize forms first
    this.serviceFormEn = this.fb.group({
      title: ['', [Validators.required]],
      excerpt: ['', Validators.required],
      editorContent: ['', Validators.required],
    });

    this.serviceFormAr = this.fb.group({
      title: ['', [Validators.required]],
      excerpt: ['', Validators.required],
      editorContent: ['', Validators.required],
    });

    if (this.serviceService.editMode === true) {
      this.routerActive.queryParams
        .pipe(takeUntil(this.destroy$))
        .subscribe((val) => {
          this.serviceId = val['id'];
          // Fetch English data
          this.serviceService
            .getById(this.serviceId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
              this.postEditing = val;

              // Patch the forms with the data
              this.serviceFormEn.patchValue({
                title:
                  this.postEditing.title?.en || this.postEditing.title || '',
                excerpt:
                  this.postEditing.summary?.en ||
                  this.postEditing.summary ||
                  '',
                editorContent:
                  this.postEditing.content?.en ||
                  this.postEditing.content ||
                  '',
              });

              this.imgUrl =
                this.postEditing.image || 'assets/placeholder-image.webp';
              this.imageValid = true;
              this.formStatus = 'Editing';
            });
          // Fetch Arabic data
          this.serviceService
            .getById(this.serviceId, 'ar')
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
              this.postEditing = val;
              // Patch Arabic form with Arabic data
              this.serviceFormAr.patchValue({
                title: this.postEditing.title || '',
                excerpt: this.postEditing.summary || '',
                editorContent: this.postEditing.content || '',
              });
            });
        });
    }
  }
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.editor.destroy();
  }
  onLanguageChange(language: string) {
    this.language = language;
  }

  // Check if both forms are valid and image is selected
  areFormsValid(): boolean {
    return (
      this.serviceFormEn.valid &&
      this.serviceFormAr.valid &&
      this.imageValid &&
      this.selectedImg !== null
    );
  }

  onSubmit() {
    if (!this.areFormsValid()) {
      if (
        !this.imageValid &&
        !this.selectedImg &&
        !this.serviceService.editMode
      ) {
        this.toaster.error('Please select an image');
      } else {
        this.toaster.error(
          'Please fill all required fields in both English and Arabic forms'
        );
      }
      return;
    }

    const serviceData: Service = {
      title: {
        en: this.serviceFormEn.value.title,
        ar: this.serviceFormAr.value.title,
      },
      summary: {
        en: this.serviceFormEn.value.excerpt,
        ar: this.serviceFormAr.value.excerpt,
      },
      content: {
        en: this.serviceFormEn.value.editorContent,
        ar: this.serviceFormAr.value.editorContent,
      },
      image:
        this.serviceService.editMode && !this.selectedImg
          ? this.postEditing.image
          : 'image',
    };

    if (this.serviceService.editMode === false) {
      this.serviceService
        .create(serviceData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (createResponse) => {
            const serviceId = createResponse['data']['_id']; // Get the service ID
            const imageFile = this.selectedImg; // Get the image file

            if (!imageFile) {
              this.toaster.error('No image file selected for upload');
              return;
            }
            // Upload the image
            this.serviceService
              .uploadImage(imageFile, serviceId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (_uploadResponse) => {
                  this.toaster.success('Service created successfully!');
                  this.resetForm();
                  this.router.navigate(['/dashboard/ui-elements/services']);
                },
                error: (uploadError) => {
                  console.error('Error uploading image:', uploadError);
                  this.toaster.error(
                    'Error uploading image. Please try again.'
                  );
                },
              });
          },
          error: (createError) => {
            console.error('Error creating service:', createError);
            this.toaster.error('Error creating service. Please try again.');
          },
        });
    } else if (this.serviceService.editMode === true) {
      this.routerActive.queryParams
        .pipe(takeUntil(this.destroy$))
        .subscribe((val) => {
          this.serviceId = val['id'];
          this.serviceService
            .getById(this.serviceId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (val) => {
                const imageURLApp = val.image;

                this.serviceService
                  .update(serviceData, this.serviceId)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe((_createResponse) => {
                    const serviceId_ = val['_id']; // Get the service ID

                    const imageFile = this.selectedImg; // Get the image file

                    // Only update image if a new image was selected
                    if (imageFile) {
                      const imageId = imageURLApp
                        .slice(
                          imageURLApp.indexOf('/files/'),
                          imageURLApp.indexOf('/view?')
                        )
                        .split('/')[2];

                      this.serviceService
                        .updateImage(imageFile, imageId, serviceId_)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe({
                          next: (uploadResponse) => {
                            this.toaster.success(
                              'Service updated successfully!'
                            );
                            this.resetForm();
                            this.router.navigate(['/dashboard/ui-elements/services']);
                          },
                          error: (uploadError) => {
                            console.error(
                              'Error uploading image:',
                              uploadError
                            );
                            this.toaster.error(
                              'Error uploading image. Service content updated successfully.'
                            );
                          },
                        });
                    } else {
                      // No new image selected, just update the content
                      this.toaster.success('Service updated successfully!');
                      this.resetForm();
                      this.router.navigate(['/dashboard/ui-elements/services']);
                    }
                  });
              },
            });
        });
    }
  }
  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImg = file;
      this.imageValid = true;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target?.result;
      };
      reader.readAsDataURL(file);

      // Show success message
      this.toaster.success('Image selected successfully!');
    } else {
      this.selectedImg = null;
      this.imageValid = false;
      // In edit mode, keep the existing image if no new image is selected
      if (this.serviceService.editMode && this.postEditing?.image) {
        this.imgUrl = this.postEditing.image;
      } else {
        this.imgUrl = 'assets/placeholder-image.webp';
      }
    }
  }
  resetForm() {
    this.serviceFormEn.reset();
    this.serviceFormAr.reset();
    this.imgUrl = 'assets/placeholder-image.webp';
    this.imageValid = false;
    this.selectedImg = null;
  }
}
