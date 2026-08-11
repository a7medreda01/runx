import { Component, Input, Output, EventEmitter, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <!-- Backdrop -->
        <div 
          (click)="closeModal()"
          class="fixed inset-0 bg-[#080C14]/85 backdrop-blur-md transition-opacity"
        ></div>

        <!-- Form Card -->
        <div class="relative w-full max-w-xl bg-[#0D1322] border border-[#C1662F]/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 my-8">
          
          <button 
            (click)="closeModal()"
            class="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#1E2A4A] text-white hover:text-[#E28A4A] flex items-center justify-center border border-white/10 transition-colors"
          >
            ✕
          </button>

          <div class="mb-6 space-y-2">
            <span class="runx-glass-pill text-xs">
              استشارة برمجية وتصميمية
            </span>
            <h3 class="text-2xl font-bold font-display text-white">
              احجز جلسة استشارة مع مهندسي runx tech
            </h3>
            <p class="text-xs text-[#94A3B8]">
              اكتب تفاصيل مشروعك وسيقوم فريقنا البرمجي بالتواصل معك خلال ساعتين لتحديد الموعد ودراسة المتطلبات.
            </p>
          </div>

          @if (isSubmitted()) {
            <div class="p-6 bg-[#141C30] border border-emerald-500/30 rounded-xl text-center space-y-3">
              <div class="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h4 class="text-lg font-bold text-white">تم استلام طلبك بنجاح!</h4>
              <p class="text-sm text-[#94A3B8]">
                شكراً لتواصلك مع runx tech. قام فريق الهندسة التقنية بجدولة الطلب وسنتواصل معك قريباً.
              </p>
              <button (click)="closeModal()" class="btn-runx-primary text-sm mt-2">
                <span>إغلاق النافذة</span>
              </button>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
              
              <div>
                <label class="block text-xs font-medium text-[#CBD5E1] mb-1">الاسم الكريم *</label>
                <input 
                  type="text" 
                  formControlName="name" 
                  placeholder="أدخل اسمك الكامل"
                  class="runx-input"
                >
                @if (form.get('name')?.touched && form.get('name')?.invalid) {
                  <span class="text-xs text-rose-400 mt-1 block">يرجى كتابة الاسم بشكل صحيح</span>
                }
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-[#CBD5E1] mb-1">البريد الإلكتروني *</label>
                  <input 
                    type="email" 
                    formControlName="email" 
                    placeholder="example@domain.com"
                    class="runx-input dir-ltr text-right"
                  >
                </div>

                <div>
                  <label class="block text-xs font-medium text-[#CBD5E1] mb-1">رقم الواتساب / الجوال *</label>
                  <input 
                    type="tel" 
                    formControlName="phone" 
                    placeholder="+966 5x xxx xxxx"
                    class="runx-input dir-ltr text-right"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-[#CBD5E1] mb-1">نوع الخدمة المطلوب *</label>
                <select formControlName="serviceType" class="runx-input bg-[#0D1322]">
                  <option value="web">تطوير موقع إلكتروني / منصة</option>
                  <option value="ecommerce">متجر إلكتروني متكامل</option>
                  <option value="mobile">تطبيق جوال iOS / Android</option>
                  <option value="saas">نظام سحابي / ERP مخصص</option>
                  <option value="uiux">تصميم واجهات وتجربة UI/UX</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-medium text-[#CBD5E1] mb-1">نبذة مختصرة عن المشروع والهدف *</label>
                <textarea 
                  formControlName="notes" 
                  rows="3" 
                  placeholder="اشرح لنا فكرة مشروعك، الفئة المستهدفة، والميزانية التقديرية..."
                  class="runx-input"
                ></textarea>
              </div>

              <button 
                type="submit" 
                [disabled]="form.invalid || isSubmitting()"
                class="btn-runx-primary w-full py-3 text-center justify-center font-bold text-base mt-2 disabled:opacity-50"
              >
                @if (isSubmitting()) {
                  <span>جاري الإرسال...</span>
                } @else {
                  <span>تأكيد وإرسال طلب الاستشارة</span>
                }
              </button>

            </form>
          }

        </div>
      </div>
    }
  `
})
export class ContactModalComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  public isSubmitting = signal<boolean>(false);
  public isSubmitted = signal<boolean>(false);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(8)]],
    serviceType: ['web', Validators.required],
    notes: ['', [Validators.required, Validators.minLength(10)]]
  });

  public onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.form.reset({ serviceType: 'web' });
    }, 1000);
  }

  public closeModal() {
    this.isSubmitted.set(false);
    this.close.emit();
  }
}
