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
  private apiService = inject(ApiService);

  public isSubmitting = signal<boolean>(false);
  public submittedResponse = signal<ContactSubmitResponse | null>(null);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    const val = this.form.value;

    this.apiService.submitContact({
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
