import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService, ContactSubmitResponse } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-page.html'
})
export class ContactPage {
  public lang = inject(LanguageService);
  private fb = inject(FormBuilder);
  public api = inject(ApiService);

  public isSubmitting = signal<boolean>(false);
  public submittedResponse = signal<ContactSubmitResponse | null>(null);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  public formatPhone(raw?: string): string {
    if (!raw) return '+20 114 847 2670';
    const clean = raw.trim();
    if (clean.startsWith('+')) return clean;
    if (clean.startsWith('20') && clean.length === 12) {
      return `+20 ${clean.substring(2, 5)} ${clean.substring(5, 8)} ${clean.substring(8)}`;
    }
    if (clean.startsWith('966') && clean.length >= 11) {
      return `+966 ${clean.substring(3, 5)} ${clean.substring(5, 8)} ${clean.substring(8)}`;
    }
    return `+${clean}`;
  }

  public getSocialIcon(platform: string): string {
    const p = (platform || '').toLowerCase();
    if (p.includes('face')) return 'bi-facebook';
    if (p.includes('link')) return 'bi-linkedin';
    if (p.includes('insta')) return 'bi-instagram';
    if (p.includes('twit') || p === 'x') return 'bi-twitter-x';
    if (p.includes('whats')) return 'bi-whatsapp';
    if (p.includes('you')) return 'bi-youtube';
    if (p.includes('git')) return 'bi-github';
    return 'bi-globe';
  }

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const val = this.form.value;

    this.api.submitContact({
      name: val.name || '',
      email: val.email || '',
      phone: val.phone || '',
      subject: val.subject || '',
      message: val.message || ''
    }).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.submittedResponse.set(res);
        this.form.reset();
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
