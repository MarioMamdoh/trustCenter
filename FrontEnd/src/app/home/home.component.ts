import {
  Component,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { SectionHeadingComponent } from '../shared/common/section-heading/section-heading.component';
import { interval, Subscription } from 'rxjs';
import { DatePipe, getLocaleNumberFormat } from '@angular/common';
import { TestimonialsComponent } from '../shared/common/testimonials/testimonials.component';
import { ServicesShComponent } from '../shared/common/services-sh/services-sh.component';
import { WhyUsComponent } from '../shared/common/why-us/why-us.component';
import { BlogComponent } from '../blogs/blog/blog.component';
import { AppService } from '../../../services/appService.service';
import { LanguageService } from '../../../services/language.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [
    SectionHeadingComponent,
    TestimonialsComponent,
    ServicesShComponent,
    WhyUsComponent,
    BlogComponent,
    DatePipe,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
})
export class HomeComponent implements OnInit, OnDestroy {
  blogsData = [];
  appService = inject(AppService);
  private languageService = inject(LanguageService);
  private languageSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.loadBlogs();
    this.languageSubscription = this.languageService
      .getLanguageObservable()
      .subscribe(() => {
        this.loadBlogs();
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  loadBlogs() {
    const language = this.languageService.getLanguage();
    this.appService.getAllBlogs(language).subscribe((val) => {
      this.blogsData = val.slice(0, 4);
    });
  }
}
