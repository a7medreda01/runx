import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly STORAGE_KEY = 'admin_logged_in';

  login(email: string, pass: string): boolean {
    if (email === 'def@admin.com' && pass === 'Admin@12345') {
      localStorage.setItem(this.STORAGE_KEY, 'true');
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.STORAGE_KEY) === 'true';
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }
}
