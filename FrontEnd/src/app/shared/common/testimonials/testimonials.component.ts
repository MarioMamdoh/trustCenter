import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { SectionHeadingComponent } from '../section-heading/section-heading.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-testimonials',
  imports: [SectionHeadingComponent, TranslateModule, NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
  standalone: true,
})
export class TestimonialsComponent implements OnInit {
  currentIndex = 0;
  isPausedTestimonials = false;
  private subscription!: Subscription;
  @ViewChild('testimonials', { static: true }) testimonialsRef!: ElementRef;

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  nextTestimonial(): void {
    if (this.currentIndex < 4) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.updateCarousel();
  }

  previousTestimonial(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = 4;
    }
    this.updateCarousel();
  }

  goToTestimonial(index: number): void {
    this.currentIndex = index;
    this.updateCarousel();
  }

  private updateCarousel(): void {
    const carousel = this.testimonialsRef.nativeElement;
    const translateX = -this.currentIndex * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
  }

  private startAutoPlay(): void {
    this.subscription = interval(5000).subscribe(() => {
      if (!this.isPausedTestimonials) {
        this.nextTestimonial();
      }
    });
  }

  stopToggleTestimonials(): void {
    this.isPausedTestimonials = true;
  }

  returnToggleTestimonials(): void {
    this.isPausedTestimonials = false;
  }

  // Legacy methods for backward compatibility
  nextTestimnials(
    testimonials: HTMLDivElement,
    nextArrow: HTMLSpanElement,
    prevArrow: HTMLSpanElement
  ): void {
    this.nextTestimonial();
  }

  previousTestimnials(
    testimonials: HTMLDivElement,
    prevArrow: HTMLSpanElement,
    nextArrow: HTMLSpanElement
  ): void {
    this.previousTestimonial();
  }
}
