import { Component, ChangeDetectorRef, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class AdminLoginComponent {
  email = '';
  password = '';
  showPassword = signal(false);
  errorMessage = signal('');
  isLoading = signal(false);

  constructor(
    private authService: AdminAuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  togglePassword(): void {
    this.showPassword.update(v => !v);
  }

  async onSubmit(): Promise<void> {
    const cleanEmail = (this.email || '').trim();
    const cleanPass = (this.password || '').trim();

    if (!cleanEmail || !cleanPass) {
      this.errorMessage.set('الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      this.cdr.markForCheck();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.cdr.markForCheck();

    try {
      const success = this.authService.login(cleanEmail, cleanPass);
      if (success) {
        await this.router.navigate(['/admin']);
      } else {
        this.errorMessage.set('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      console.error('Login error:', err);
      this.errorMessage.set('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      this.isLoading.set(false);
      this.cdr.markForCheck();
    }
  }
}
