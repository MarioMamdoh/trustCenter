import { Component, OnDestroy, inject } from '@angular/core';
import { LanguageService } from '../../../../services/language.service';
import { Subscription } from 'rxjs';

@Component({
    template: '',
    standalone: false
})
export abstract class LanguageAwareComponent implements OnDestroy {
  protected languageService = inject(LanguageService);
  protected languageSubscription: Subscription = new Subscription();

  constructor() {
    this.setupLanguageListener();
  }

  ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  private setupLanguageListener(): void {
    this.languageSubscription.add(
      this.languageService.getLanguageObservable().subscribe((language) => {
        this.onLanguageChange(language);
      })
    );
  }

  // Abstract method that child components must implement
  protected abstract onLanguageChange(language: string): void;

  // Helper method to get current language
  protected getCurrentLanguage(): string {
    return this.languageService.getLanguage();
  }
}
