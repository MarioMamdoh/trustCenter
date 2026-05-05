import { Component, inject, Input } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { AppService } from '../../../../../services/appService.service';
import { LanguageService } from '../../../../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input({ required: true }) body!: HTMLBodyElement;
  toastr = inject(ToastrService);
  private router = inject(Router);

  constructor(
    private translate: TranslateService,
    private appService: AppService,
    private languageService: LanguageService
  ) {
    // Set default language to Arabic
    translate.setDefaultLang('ar');
    // Use the language from localStorage
    const currentLang = this.languageService.getLanguage();
    translate.use(currentLang);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    // Use LanguageService to set language and update localStorage
    this.languageService.setLanguage(language);
    // Also emit through AppService for backward compatibility
    this.appService.emitLanguageChange(language);
  }

  showList(
    navbar: HTMLUListElement,
    body: HTMLBodyElement,
    burgerList: HTMLUListElement
  ) {
    // Check if we're on mobile (navbar has sm:hidden class)
    const isMobile =
      navbar.classList.contains('sm:hidden') || window.innerWidth < 900;

    if (isMobile) {
      // Mobile navigation
      const mobileNav = document.querySelector(
        '.navbar_list_mobile'
      ) as HTMLElement;
      if (mobileNav) {
        mobileNav.classList.toggle('hidden');
        mobileNav.classList.toggle('block');
      }
    } else {
      // Desktop navigation
      navbar.classList.contains('active')
        ? navbar.classList.remove('active')
        : navbar.classList.add('active');
    }

    // Close menu when clicking outside
    body.onclick = (e) => {
      const target = e.target as HTMLElement;
      if (!navbar.contains(target) && !burgerList.contains(target)) {
        if (isMobile) {
          const mobileNav = document.querySelector(
            '.navbar_list_mobile'
          ) as HTMLElement;
          if (mobileNav) {
            mobileNav.classList.add('hidden');
            mobileNav.classList.remove('block');
          }
        } else {
          navbar.classList.remove('active');
        }
        body.onclick = null;
      }
    };
  }

  checkOffers(event: Event) {
    event.preventDefault(); // Prevent default navigation
    const currentLang = this.languageService.getLanguage();

    this.appService.getOffers(currentLang).subscribe({
      next: (res) => {
        if (!res || res.length === 0) {
          const message =
            currentLang === 'en'
              ? 'No offers available at the moment. Please check back later!'
              : 'لا توجد عروض متاحة حالياً. يرجى التحقق لاحقاً!';

          this.toastr.warning(
            message,
            currentLang === 'en' ? 'No Offers' : 'لا توجد عروض',
            {
              timeOut: 5000,
              positionClass: 'toast-top-right',
              closeButton: true,
              progressBar: true,
            }
          );
        } else {
          // If there are offers, navigate to the offers page
          this.router.navigate(['/offers']);
        }
      },
      error: (error) => {
        // Show error toastr
        const errorMessage =
          currentLang === 'en'
            ? 'Error checking offers. Please try again.'
            : 'خطأ في التحقق من العروض. يرجى المحاولة مرة أخرى.';

        this.toastr.error(
          errorMessage,
          currentLang === 'en' ? 'Error' : 'خطأ',
          {
            timeOut: 5000,
            positionClass: 'toast-top-right',
            closeButton: true,
            progressBar: true,
          }
        );
      },
    });
  }
}
