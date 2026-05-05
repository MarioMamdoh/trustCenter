import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../enviroment';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private http = inject(HttpClient);
  private mainAPI = environment.MainAPI;

  // Language change subject
  private languageChangeSubject = new Subject<string>();
  public languageChange$ = this.languageChangeSubject.asObservable();

  // Current language behavior subject
  private currentLanguageSubject = new BehaviorSubject<string>(
    this.getCurrentLanguage()
  );
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  // Method to get current language from localStorage
  getCurrentLanguage(): string {
    return localStorage.getItem('language') || 'ar';
  }

  // Method to emit language change
  emitLanguageChange(language: string) {
    localStorage.setItem('language', language);
    this.languageChangeSubject.next(language);
    this.currentLanguageSubject.next(language);
  }

  // Method to update language from localStorage (for external changes)
  updateLanguageFromStorage() {
    const currentLang = this.getCurrentLanguage();
    this.currentLanguageSubject.next(currentLang);
  }

  getAllAchievements(): Observable<any> {
    return this.http.get(`${this.mainAPI}/achievements`, {
      responseType: 'json',
    });
  }
  getAchievementById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/achievements/${id}`, {
      responseType: 'json',
    });
  }
  getAllBlogs(language: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/blogs?lang=${language}`);
  }
  getAllBlogsLimit(limit: number): Observable<any> {
    return this.http.get(`${this.mainAPI}/blogs?limit=${limit}`);
  }
  getAllBlogsSkipLimit(
    limit: number,
    page: number,
    language: string
  ): Observable<any> {
    return this.http.get(
      `${this.mainAPI}/blogs?limit=${limit}&page=${page}&lang=${language}`
    );
  }
  getBlogById(id: string, language: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/blogs/${id}?lang=${language}`);
  }
  incrementBlogViews(id: string): Observable<any> {
    return this.http.patch(`${this.mainAPI}/blogs/${id}/views`, null);
  }
  getAllServices(language: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/services?lang=${language}`);
  }
  getServiceById(id: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/services/${id}`);
  }
  IsThereFreeBed(areaName: string): Observable<any> {
    return this.http.get(
      `${this.mainAPI}/beds/area/${areaName}?isReserved=false`
    );
  }
  getOffers(language: string): Observable<any> {
    return this.http.get(`${this.mainAPI}/offers?lang=${language}`);
  }
}
