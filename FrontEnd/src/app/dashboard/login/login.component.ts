import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { EmployeesService } from '../services/emplyees.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hidePassword = true;
  loading = false;
  error: string | null = null;

  private employeesService = inject(EmployeesService);
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.error = null;
      const { email, password } = form.value;
      this.employeesService.login(email, password).subscribe({
        next: (res: any) => {
          this.authService.login(res.access_token);
          sessionStorage.setItem('user_role', res.user.role);
          sessionStorage.setItem('user_fullName', res.user.fullName);
          sessionStorage.setItem('user_email', res.user.email);
          this.router.navigate(['/dashboard/employees']);
        },
        error: (err: unknown) => {
          const errorObj = err as any;
          this.error =
            errorObj?.error?.message || 'Login failed. Please try again.';
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }
}
