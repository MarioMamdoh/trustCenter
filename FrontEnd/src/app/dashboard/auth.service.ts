import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.TOKEN_KEY);
  }

  login(token: string = 'demo-token') {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}
