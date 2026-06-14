import { Component } from '@angular/core';
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
  errorMessage = '';
  isLoading = false;

  constructor(
    private authService: AdminAuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'الرجاء إدخال البريد الإلكتروني وكلمة المرور';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    // Artificial delay to simulate processing and look professional
    setTimeout(() => {
      const success = this.authService.login(this.email, this.password);
      this.isLoading = false;

      if (success) {
        this.router.navigate(['/admin']);
      } else {
        this.errorMessage = 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
      }
    }, 800);
  }
}
