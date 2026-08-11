import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService, ContactSubmitResponse } from '../../core/services/api.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-16">
      
      <!-- Header -->
      <div class="text-center space-y-4 max-w-3xl mx-auto">
        <span class="runx-glass-pill text-xs">تواصل مع Runx Tech</span>
        <h1 class="text-3xl sm:text-5xl font-bold font-display text-slate-900">
          نحن هنا لمناقشة مشروعك القادم
        </h1>
        <p class="subtext-lead text-slate-700">
          سواء كان لديك فكرة جديدة، أو ترغب في تطوير نظامك الحالي، يسعد فريقنا بالاستماع إليك وتقديم الحل المناسب.
        </p>
      </div>

      <!-- Info Cards & Form Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        <!-- Contact Information Cards -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="runx-card p-6 space-y-4">
            <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#C1662F]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold font-display text-slate-900 mb-1">المقر الرئيسي</h3>
              <p class="text-sm text-slate-600">الرياض، المملكة العربية السعودية</p>
            </div>
          </div>

          <div class="runx-card p-6 space-y-4">
            <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#C1662F]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold font-display text-slate-900 mb-1">البريد الإلكتروني</h3>
              <a href="mailto:contact@runxtech.com" class="text-sm text-[#C1662F] font-semibold hover:underline dir-ltr inline-block">
                contact&#64;runxtech.com
              </a>
            </div>
          </div>

          <div class="runx-card p-6 space-y-4">
            <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-[#C1662F]">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-bold font-display text-slate-900 mb-1">الواتساب / الجوال المباشر</h3>
              <a href="https://wa.me/966500000000" target="_blank" class="text-sm text-[#C1662F] font-semibold hover:underline dir-ltr inline-block">
                +966 50 000 0000
              </a>
            </div>
          </div>

        </div>

        <!-- Form -->
        <div class="lg:col-span-7 runx-card p-8 sm:p-10 space-y-6">
          <h2 class="text-2xl font-bold font-display text-slate-900 border-b border-slate-100 pb-4">
            ارسل رسالتك مباشرة إلى فريق البرمجة
          </h2>

          @if (submittedResponse(); as res) {
            <div class="p-6 bg-slate-50 border border-emerald-200 rounded-2xl space-y-4">
              <div class="flex items-center gap-3 text-emerald-700">
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center font-bold text-lg">
                  ✓
                </div>
                <div>
                  <h3 class="text-lg font-bold font-display">تم استقبال الطلب من سيرفر الـ API!</h3>
                  <p class="text-xs text-slate-500">حالة الاستجابة: {{ res.status }}</p>
                </div>
              </div>

              <div class="bg-white p-4 rounded-xl border border-slate-200 text-xs space-y-2 dir-rtl">
                <div class="flex justify-between border-b border-slate-100 pb-2">
                  <span class="text-slate-500">رقم المرجع (API Ref):</span>
                  <span class="font-mono font-bold text-[#1E2A4A]">{{ res.referenceId }}</span>
                </div>
                <div class="flex justify-between border-b border-slate-100 pb-2">
                  <span class="text-slate-500">تاريخ التسجيل:</span>
                  <span class="font-semibold text-slate-700">{{ res.receivedAt }}</span>
                </div>
                <div class="flex justify-between border-b border-slate-100 pb-2">
                  <span class="text-slate-500">المهندس المسؤول:</span>
                  <span class="font-semibold text-[#C1662F]">{{ res.assignedEngineer }}</span>
                </div>
                <div>
                  <span class="text-slate-500 block mb-1">البيانات الحقيقية المرسلة لـ API:</span>
                  <pre class="bg-slate-900 text-emerald-400 p-3 rounded-lg font-mono text-[11px] overflow-x-auto text-left dir-ltr">{{ res | json }}</pre>
                </div>
              </div>

              <button (click)="submittedResponse.set(null)" class="btn-runx-primary text-xs px-5 py-2">
                <span>إرسال استفسار جديد</span>
              </button>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">الاسم الكامل *</label>
                <input 
                  type="text" 
                  formControlName="name" 
                  placeholder="أدخل اسمك"
                  class="runx-input"
                >
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">البريد الإلكتروني *</label>
                  <input 
                    type="email" 
                    formControlName="email" 
                    placeholder="example@domain.com"
                    class="runx-input dir-ltr text-right"
                  >
                </div>
                <div>
                  <label class="block text-xs font-medium text-slate-700 mb-1">رقم التواصل / الجوال *</label>
                  <input 
                    type="tel" 
                    formControlName="phone" 
                    placeholder="+966 5x xxx xxxx"
                    class="runx-input dir-ltr text-right"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">عنوان الموضوع *</label>
                <input 
                  type="text" 
                  formControlName="subject" 
                  placeholder="مثال: الاستفسار عن برمجة متجر إلكتروني..."
                  class="runx-input"
                >
              </div>

              <div>
                <label class="block text-xs font-medium text-slate-700 mb-1">تفاصيل الرسالة *</label>
                <textarea 
                  formControlName="message" 
                  rows="4" 
                  placeholder="اكتب استفسارك بالتفصيل..."
                  class="runx-input"
                ></textarea>
              </div>

              <button 
                type="submit" 
                [disabled]="form.invalid || isSubmitting()"
                class="btn-runx-primary w-full py-4 text-center justify-center font-bold text-base mt-2 disabled:opacity-50"
              >
                @if (isSubmitting()) {
                  <span>جاري الاتصال بـ API وسحب البيانات...</span>
                } @else {
                  <span>إرسال الرسالة إلى API</span>
                }
              </button>
            </form>
          }
        </div>

      </div>

      <!-- FAQ Section -->
      <section class="runx-card p-8 sm:p-12 space-y-8">
        <div class="text-center space-y-2">
          <span class="runx-glass-pill text-xs">أسئلة مكررة</span>
          <h2 class="text-3xl font-bold font-display text-slate-900">الأسئلة الشائعة</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-slate-900 text-base">كم تستغرق مدة تنفيذ مشروع موقع أو متجر متكامل؟</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              تختلف المدة حسب التعقيد. عادة يستغرق الموقع التعريفي 10-14 يوماً، بينما المتاجر الإلكترونية والتطبيقات بين 20 إلى 35 يوم عمل.
            </p>
          </div>

          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-slate-900 text-base">هل يوفر runx tech لوحة تحكم باللغة العربية؟</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              نعم، كافة اللوحات المخصصة التي نبنيها تأتي بواجهات عربية مبسطة تمكنك من تعديل المحتوى والصور والمنتجات بكل سهولة بدون الحاجة لخلفية برمجية.
            </p>
          </div>

          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-slate-900 text-base">ما هي طريقة وتسلسلات الدفع والتعاقد؟</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              يتم الدفع على دفعتين أو ثلاث دفعات مجدولة بوضوح في العقد الرسمية (دفعة أولى عند توقيع العقد، دفعة أثناء التسليم الأولي، ودفعة عند الإطلاق النهائي).
            </p>
          </div>

          <div class="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 class="font-bold text-slate-900 text-base">هل نحصل على شفرة المصدر (Source Code) بعد التسليم؟</h4>
            <p class="text-xs text-slate-600 leading-relaxed">
              بالتأكيد. الشفرة المصدرية وكافة حقوق الملكية الفكرية والملفات التصميمية تكون ملكية كاملة ومسجلة باسم العميل فور إتمام التسليم النهائي.
            </p>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ContactPage {
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
