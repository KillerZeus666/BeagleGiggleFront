import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: any = null;

  login(user: any) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
  }

  getUser() {
    if (!this.user) {
      const stored = localStorage.getItem('user');
      this.user = stored ? JSON.parse(stored) : null;
    }
    return this.user;
  }

  getUserType(): string | null {
    return this.getUser()?.tipo || null;
  }

  getUserName(): string {
    return this.getUser()?.nombre || '';
  }

  getUserPhoto(): string {
    return this.getUser()?.foto || 'https://w7.pngwing.com/pngs/946/556/png-transparent-computer-icons-login-user-profile-client-smiley-%D0%B7%D0%BD%D0%B0%D1%87%D0%BA%D0%B8-windows-10-thumbnail.png';
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }
}
