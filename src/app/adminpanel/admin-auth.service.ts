import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private readonly STORAGE_KEY = 'admin_logged_in';

  login(email: string, pass: string): boolean {
    const e = (email || '').trim().toLowerCase();
    const p = (pass || '').trim();

    const validEmails = [
      'def@admin.com',
      'admin@runx.com',
      'admin@runxtech.com',
      'admin@admin.com',
      'admin'
    ];

    const validPasswords = [
      'Admin@12345',
      'admin@12345',
      'Admin12345',
      'admin123',
      'admin',
      '123456'
    ];

    if (validEmails.includes(e) && validPasswords.includes(p)) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.STORAGE_KEY, 'true');
      }
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
