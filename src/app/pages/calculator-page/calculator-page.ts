import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EstimatorService } from '../../core/services/estimator.service';
import { ApiService, EstimateSubmitResponse } from '../../core/services/api.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-calculator-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator-page.html'
})
export class CalculatorPage {
  public lang = inject(LanguageService);
  private fb = inject(FormBuilder);
  public estimator = inject(EstimatorService);
  private apiService = inject(ApiService);

  public isSubmitting = signal<boolean>(false);
  public apiEstimateResponse = signal<EstimateSubmitResponse | null>(null);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(8)]]
  });

  public formatNum(val: number | undefined | null): string {
    return new Intl.NumberFormat('en-US').format(val || 0);
  }

  public submitEstimate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const val = this.form.value;

    this.apiService.submitEstimate({
      projectType: this.estimator.currentType()?.title || 'عام',
      addons: this.estimator.selectedAddonsList().map(a => a.title),
      timeline: this.estimator.currentTimeline()?.title || 'عادي',
      estimatedPrice: this.estimator.estimatedTotalPrice(),
      estimatedDays: this.estimator.estimatedTotalDays(),
      clientName: val.name || '',
      clientContact: val.phone || ''
    }).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.apiEstimateResponse.set(res);
      },
      error: () => {
        this.isSubmitting.set(false);
      }
    });
  }
}
