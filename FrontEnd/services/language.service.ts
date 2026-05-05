import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>(
    this.getCurrentLanguage()
  );
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Listen for localStorage changes
    this.setupStorageListener();
  }

  private getCurrentLanguage(): string {
    return localStorage.getItem('language') || 'ar';
  }

  private setupStorageListener(): void {
    // Listen for storage events (when localStorage changes in other tabs/windows)
    window.addEventListener('storage', (event) => {
      if (event.key === 'language') {
        this.updateLanguage();
      }
    });

    // Also check for changes periodically (for same-tab changes)
    setInterval(() => {
      const currentLang = this.getCurrentLanguage();
      if (currentLang !== this.currentLanguageSubject.value) {
        this.updateLanguage();
      }
    }, 1000); // Check every second
  }

  private updateLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    this.currentLanguageSubject.next(currentLang);
  }

  public setLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.currentLanguageSubject.next(language);
  }

  public getLanguage(): string {
    return this.currentLanguageSubject.value;
  }

  public getLanguageObservable(): Observable<string> {
    return this.currentLanguage$;
  }
}
