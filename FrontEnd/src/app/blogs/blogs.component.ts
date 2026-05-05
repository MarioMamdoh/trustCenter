import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionHeadingComponent } from '../shared/common/section-heading/section-heading.component';
import { DatePipe } from '@angular/common';
import { AppService } from '../../../services/appService.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  imports: [RouterLink, SectionHeadingComponent, DatePipe, TranslateModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  standalone: true,
})
export class BlogsComponent implements OnInit, OnDestroy {
  blogs = [];
  currentPage = 1;
  totalPages!: number;
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
    this.appService
      .getAllBlogsSkipLimit(9, this.currentPage, language)
      .subscribe((val) => {
        this.blogs = val;
        this.appService.getAllBlogs(language).subscribe((data) => {
          this.totalPages = Math.ceil(data.length / 9);
        });
      });
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadBlogs();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadBlogs();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadBlogs();
    }
  }
}
