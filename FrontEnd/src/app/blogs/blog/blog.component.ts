import {
  Component,
  ElementRef,
  inject,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { SectionHeadingComponent } from '../../shared/common/section-heading/section-heading.component';
import { interval, Subscription } from 'rxjs';
import { AppService } from '../../../../services/appService.service';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../services/language.service';

@Component({
  selector: 'app-blog',
  imports: [SectionHeadingComponent, DatePipe, RouterLink, TranslateModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  standalone: true,
})
export class BlogComponent implements OnInit, OnDestroy {
  curentIndex = 0;
  isPasuedBlogList = false;
  private subscription!: Subscription;
  appService = inject(AppService);
  private languageService = inject(LanguageService);
  private languageSubscription: Subscription = new Subscription();
  blogsFirstData = [];
  blogsSecondData = [];
  blogsThirdData = [];
  blogsFourthData = [];
  @ViewChild('blogList', { static: true }) blogListRef!: ElementRef;
  ngOnInit(): void {
    this.moveToggleBlogList();
    this.loadBlogs();
    this.languageSubscription = this.languageService
      .getLanguageObservable()
      .subscribe(() => {
        this.loadBlogs();
      });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }
  private loadBlogs() {
    const language = this.languageService.getLanguage();
    this.appService.getAllBlogsSkipLimit(3, 1, language).subscribe((val) => {
      this.blogsFirstData = val;
    });
    this.appService.getAllBlogsSkipLimit(3, 2, language).subscribe((val) => {
      this.blogsSecondData = val;
    });
    this.appService.getAllBlogsSkipLimit(3, 3, language).subscribe((val) => {
      this.blogsThirdData = val;
    });
    this.appService.getAllBlogsSkipLimit(3, 4, language).subscribe((val) => {
      this.blogsFourthData = val;
    });
  }
  private moveToggleBlogList() {
    let blogList = this.blogListRef.nativeElement;
    const arrayList = [0, -30, -60, -90];
    this.subscription = interval(3000).subscribe(() => {
      if (!this.isPasuedBlogList) {
        if (this.curentIndex !== 4) {
          blogList.style.transform = `translateX(${
            arrayList[this.curentIndex++]
          }%)`;
        } else {
          this.curentIndex = 0;
        }
      }
    });
  }
  stopToggleBlogList() {
    let blogList = this.blogListRef.nativeElement;
    blogList.classList.add('stop-toggle');
    this.isPasuedBlogList = true;
  }
  returnToggleBlogList() {
    let blogList = this.blogListRef.nativeElement;
    blogList.classList.remove('stop-toggle');
    this.isPasuedBlogList = false;
  }
}
