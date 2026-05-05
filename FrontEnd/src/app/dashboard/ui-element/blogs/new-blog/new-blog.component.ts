import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor, NgxEditorModule, Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../../models/constant/service';
import { BlogService } from '../../../services/blogs.service';
import { NgClass } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-new-blog',
  imports: [NgClass, ReactiveFormsModule, NgxEditorModule],
  templateUrl: './new-blog.component.html',
  styleUrl: './new-blog.component.scss',
})
export class NewBlogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  blogId = '';
  formStatus = 'Adding New';
  router = inject(Router);
  routerActive = inject(ActivatedRoute);
  toaster = inject(ToastrService);
  blogService = inject(BlogService);
  imgUrl: any = 'assets/placeholder-image.webp';
  selectedImg: any;
  editor!: Editor;
  blogFormEn: FormGroup;
  blogFormAr: FormGroup;
  postEditing: any;
  language = 'en';
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
    this.blogFormEn = this.fb.group({
      title: ['', [Validators.required]],
      excerpt: ['', Validators.required],
      editorContent: ['', Validators.required],
    });

    this.blogFormAr = this.fb.group({
      title: ['', [Validators.required]],
      excerpt: ['', Validators.required],
      editorContent: ['', Validators.required],
    });

    if (this.blogService.editMode === true) {
      this.routerActive.queryParams
        .pipe(takeUntil(this.destroy$))
        .subscribe((val) => {
          this.blogId = val['id'];
          // Fetch English data
          this.blogService
            .getById(this.blogId)
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
              this.postEditing = val;

              // Update the existing form controls with the data
              this.blogFormEn.patchValue({
                image: this.postEditing.image || '',
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

              // Set the image URL for display
              this.imgUrl =
                this.postEditing.image || 'assets/placeholder-image.webp';
              this.formStatus = 'Editing';
            });
          // Fetch Arabic data
          this.blogService
            .getById(this.blogId, 'ar')
            .pipe(takeUntil(this.destroy$))
            .subscribe((val) => {
              this.postEditing = val;

              // Patch Arabic form with Arabic data
              this.blogFormAr.patchValue({
                image: this.postEditing.image || '',
                title: this.postEditing.title || '',
                excerpt: this.postEditing.summary || '',
                editorContent: this.postEditing.content || '',
              });
            });
        });
    }
  }

  ngOnInit(): void {
    // Initialize editor after forms are set up
    this.editor = new Editor({
      content: '',
      plugins: [],
      nodeViews: {},
      attributes: {},
      parseOptions: {
        preserveWhitespace: 'full',
      },
    });
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
      this.blogFormEn.valid &&
      this.blogFormAr.valid &&
      this.selectedImg !== null
    );
  }
  onSubmit() {
    if (!this.areFormsValid()) {
      if (!this.selectedImg && !this.blogService.editMode) {
        this.toaster.error('Please select an image');
      } else {
        this.toaster.error(
          'Please fill all required fields in both English and Arabic forms'
        );
      }
      return;
    }

    // Get the raw HTML content from the editor
    const rawContentEn = this.blogFormEn.value.editorContent;
    const rawContentAr = this.blogFormAr.value.editorContent;

    // Clean the content to prevent double encoding
    const cleanContentEn = this.cleanHtmlContent(rawContentEn);
    const cleanContentAr = this.cleanHtmlContent(rawContentAr);

    const blogData: Blog = {
      title: {
        en: this.blogFormEn.value.title,
        ar: this.blogFormAr.value.title,
      },
      summary: {
        en: this.blogFormEn.value.excerpt,
        ar: this.blogFormAr.value.excerpt,
      },
      content: {
        en: cleanContentEn,
        ar: cleanContentAr,
      },
      image:
        this.blogService.editMode && !this.selectedImg
          ? this.postEditing.image
          : 'image',
    };

    if (this.blogService.editMode === false) {
      this.blogService
        .create(blogData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (createResponse) => {
            const blogId = createResponse['data']['_id']; // Get the service ID

            const imageFile = this.selectedImg; // Get the image file

            if (!imageFile) {
              console.error('No file selected');
              return;
            }

            // Upload the image
            this.blogService
              .uploadImage(imageFile, blogId)
              .pipe(takeUntil(this.destroy$))
              .subscribe({
                next: (uploadResponse) => {
                  this.toaster.success('Blog created successfully!');
                  this.resetForm();
                  this.router.navigate(['/dashboard/ui-elements/blogs']);
                },
                error: (uploadError) => {
                  console.error('Error uploading image:', uploadError);
                },
              });
          },
          error: (createError) => {
            console.error('Error creating service:', createError);
          },
        });
    } else if (this.blogService.editMode === true) {
      this.routerActive.queryParams
        .pipe(takeUntil(this.destroy$))
        .subscribe((val) => {
          this.blogId = val['id'];
          this.blogService
            .getById(this.blogId)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              next: (val) => {
                const imageURLApp = val.image;

                this.blogService
                  .update(blogData, this.blogId)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe((createResponse) => {
                    const blogId_ = val['_id']; // Get the service ID

                    const imageFile = this.selectedImg; // Get the image file

                    // Only update image if a new image was selected
                    if (imageFile) {
                      const imageId = imageURLApp
                        .slice(
                          imageURLApp.indexOf('/files/'),
                          imageURLApp.indexOf('/view?')
                        )
                        .split('/')[2];

                      this.blogService
                        .updateImage(imageFile, imageId, blogId_)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe({
                          next: (uploadResponse) => {
                            this.toaster.success('Blog updated successfully!');
                            this.resetForm();
                            this.router.navigate(['/dashboard/ui-elements/blogs']);
                          },
                          error: (uploadError) => {
                            console.error(
                              'Error uploading image:',
                              uploadError
                            );
                            this.toaster.error(
                              'Error updating image. Blog content updated successfully.'
                            );
                          },
                        });
                    } else {
                      // No new image selected, just update the content
                      this.toaster.success('Blog updated successfully!');
                      this.resetForm();
                      this.router.navigate(['/dashboard/ui-elements/blogs']);
                    }
                  });
              },
            });
        });
    }
  }

  // Clean HTML content to prevent double encoding while preserving all CSS classes
  private cleanHtmlContent(content: string): string {
    if (!content) return '';

    let cleaned = content;

    // First, decode any already encoded HTML entities
    cleaned = cleaned.replace(/&lt;/g, '<');
    cleaned = cleaned.replace(/&gt;/g, '>');
    cleaned = cleaned.replace(/&amp;/g, '&');
    cleaned = cleaned.replace(/&quot;/g, '"');
    cleaned = cleaned.replace(/&#39;/g, "'");

    // Handle escaped quotes in style attributes and other attributes
    cleaned = cleaned.replace(/style=\\"/g, 'style="');
    cleaned = cleaned.replace(/class=\\"/g, 'class="');
    cleaned = cleaned.replace(/dir=\\"/g, 'dir="');
    cleaned = cleaned.replace(/src=\\"/g, 'src="');
    cleaned = cleaned.replace(/alt=\\"/g, 'alt="');
    cleaned = cleaned.replace(/\\"/g, '"');

    // Handle any remaining escaped quotes in attributes
    cleaned = cleaned.replace(/=\\"/g, '="');

    // Remove unwanted paragraph tags that ngx-editor adds
    // Remove paragraph tags around block elements (div, h1-h6, ul, ol, blockquote)
    cleaned = cleaned.replace(
      /<p>\s*(<(?:div|h[1-6]|ul|ol|blockquote|img)[^>]*>.*?<\/(?:div|h[1-6]|ul|ol|blockquote|img)>)\s*<\/p>/g,
      '$1'
    );

    // Remove paragraph tags around individual block elements
    cleaned = cleaned.replace(/<p>\s*(<(?:h[1-6]|div|ul|ol|img)[^>]*>)/g, '$1');
    cleaned = cleaned.replace(/(<\/(?:h[1-6]|div|ul|ol|img)>)\s*<\/p>/g, '$1');

    // Remove paragraph tags around list items
    cleaned = cleaned.replace(/<p>\s*(<li[^>]*>.*?<\/li>)\s*<\/p>/g, '$1');

    // Remove paragraph tags around spans and other inline elements
    cleaned = cleaned.replace(
      /<p>\s*(<(?:span|strong|em|b|i)[^>]*>.*?<\/(?:span|strong|em|b|i)>)\s*<\/p>/g,
      '$1'
    );

    // Remove any remaining paragraph tags that are just wrapping content
    cleaned = cleaned.replace(/<p>\s*(<[^>]+>.*?<\/[^>]+>)\s*<\/p>/g, '$1');

    // Remove empty paragraph tags
    cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');
    cleaned = cleaned.replace(/<p><\/p>/g, '');

    // Remove any remaining unwanted paragraph tags at the end
    cleaned = cleaned.replace(/<\/p>\s*<p>\s*<\/div>\s*<p>/g, '</div>');
    cleaned = cleaned.replace(/<\/p>\s*<p>\s*$/g, '');

    // Remove extra paragraph tags that appear at the very end
    cleaned = cleaned.replace(/<\/div>\s*<p>\s*$/g, '</div>');
    cleaned = cleaned.replace(/<p>\s*<\/div>\s*<p>\s*$/g, '</div>');

    // Handle the specific case where ngx-editor adds extra paragraph tags
    cleaned = cleaned.replace(/<p>\s*<div/g, '<div');
    cleaned = cleaned.replace(/<\/div>\s*<\/p>/g, '</div>');

    // Remove any remaining paragraph tags that are just wrapping content
    cleaned = cleaned.replace(/<p>\s*(<[^>]+>.*?<\/[^>]+>)\s*<\/p>/g, '$1');

    // Remove any remaining paragraph tags at the very beginning or end
    cleaned = cleaned.replace(/^<p>\s*/, '');
    cleaned = cleaned.replace(/\s*<\/p>$/, '');

    // Remove any remaining unwanted paragraph tags
    cleaned = cleaned.replace(/<p>\s*<\/p>/g, '');
    cleaned = cleaned.replace(/<p><\/p>/g, '');

    // Clean up any extra whitespace and newlines
    cleaned = cleaned.trim();

    return cleaned;
  }

  onImageChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedImg = file;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imgUrl = e.target?.result;
      };
      reader.readAsDataURL(file);

      // Show success message
      this.toaster.success('Image selected successfully!');
    } else {
      this.selectedImg = null;
      // In edit mode, keep the existing image if no new image is selected
      if (this.blogService.editMode && this.postEditing?.image) {
        this.imgUrl = this.postEditing.image;
      } else {
        this.imgUrl = 'assets/placeholder-image.webp';
      }
    }
  }

  resetForm() {
    this.blogFormEn.reset();
    this.blogFormAr.reset();
    this.imgUrl = 'assets/placeholder-image.webp';
    this.selectedImg = null;
  }
}
