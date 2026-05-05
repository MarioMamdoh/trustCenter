import { Component, inject } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatMenuModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  userName = sessionStorage.getItem('user_fullName') || '';
  userEmail = sessionStorage.getItem('user_email') || '';
  selected = 'en';

  signOut() {
    this.authService.logout();
    this.router.navigate(['/dashboard/login']);
  }
}
