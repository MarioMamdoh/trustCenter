import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../../services/appService.service';
import { LanguageService } from '../../../services/language.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offers',
  imports: [],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
  standalone: true,
})
export class OffersComponent implements OnInit, OnDestroy {
  offers: any[] = [];
  currentLanguage: string = 'ar';
  appService = inject(AppService);
  private languageService = inject(LanguageService);
  private languageSubscription: Subscription = new Subscription();
  private toastr = inject(ToastrService);

  ngOnInit(): void {
    this.currentLanguage = this.languageService.getLanguage();
    this.loadOffers();
    this.languageSubscription = this.languageService
      .getLanguageObservable()
      .subscribe((language) => {
        this.currentLanguage = language;
        this.loadOffers();
      });
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  loadOffers() {
    const language = this.languageService.getLanguage();
    this.appService.getOffers(language).subscribe((res) => {
      this.offers = res;

      // Show toastr notification if no offers available
      if (!res || res.length === 0) {
        const message =
          language === 'en'
            ? 'No offers available at the moment. Please check back later!'
            : 'لا توجد عروض متاحة حالياً. يرجى التحقق لاحقاً!';

        this.toastr.warning(
          message,
          language === 'en' ? 'No Offers' : 'لا توجد عروض',
          {
            timeOut: 5000,
            positionClass: 'toast-top-center',
            closeButton: true,
            progressBar: true,
          }
        );
      }
    });
  }

  // Helper method to get the correct language content
  getLocalizedContent(item: any, field: string): string {
    const currentLang = this.currentLanguage;
    return (
      item[field]?.[currentLang] || item[field]?.en || item[field]?.ar || ''
    );
  }
}
