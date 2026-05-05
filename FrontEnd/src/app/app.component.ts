import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/layouts/header/header.component';
import { FooterComponent } from './shared/layouts/footer/footer.component';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent {
  private languageService = inject(LanguageService);
  private router = inject(Router);

  constructor() {
    // Initialize default language to Arabic if not set
    if (!localStorage.getItem('language')) {
      this.languageService.setLanguage('ar');
    }
  }

  get isDashboardRoute(): boolean {
    return this.router.url.startsWith('/dashboard');
  }
}
