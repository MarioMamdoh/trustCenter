import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AppService } from '../../../services/appService.service';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blog-details',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
  standalone: true,
})
export class BlogDetailsComponent implements OnInit, OnDestroy {
  appService = inject(AppService);
  private sanitizer = inject(DomSanitizer);
  private languageService = inject(LanguageService);
  blog: any;
  sanitizedContent: SafeHtml = '';
  private languageSubscription: Subscription = new Subscription();
  private viewsSubscription: Subscription = new Subscription();
  private id: string = '';
  private viewsIncremented: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.incrementViewsOnce();
    this.loadBlog();
    this.languageSubscription = this.languageService
      .getLanguageObservable()
      .subscribe(() => {
        this.loadBlog();
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
    this.viewsSubscription.unsubscribe();
  }

  private incrementViewsOnce(): void {
    if (!this.viewsIncremented) {
      this.viewsSubscription = this.appService
        .incrementBlogViews(this.id)
        .subscribe();
      this.viewsIncremented = true;
    }
  }

  private loadBlog(): void {
    const language = this.languageService.getLanguage();
    this.appService.getBlogById(this.id, language).subscribe((val) => {
      this.blog = val;
      this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
        val.content
      );
    });
  }
}
