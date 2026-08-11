import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EstimatorService } from '../../core/services/estimator.service';
import { ApiService, EstimateSubmitResponse } from '../../core/services/api.service';

@Component({
  selector: 'app-calculator-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-12">
      
      <!-- Header -->
      <div class="text-center space-y-4 max-w-3xl mx-auto">
        <span class="runx-glass-pill text-xs">أداة التقدير الفوري للتكلفة</span>
        <h1 class="text-3xl sm:text-5xl font-bold font-display text-slate-900">
          حاسبة كلفة مشروعك الرقمي
        </h1>
        <p class="subtext-lead text-slate-700">
          حدد مواصفات التطبيق، المتجر أو الموقع للحصول على تقدير فوري وشفاف للميزانية والجدول الزمني.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Interactive Controls (Step 1, 2, 3) -->
        <div class="lg:col-span-8 space-y-8">
          
          <!-- STEP 1: PROJECT TYPE -->
          <div class="runx-card p-6 sm:p-8 space-y-6">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span class="w-8 h-8 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center text-sm">
                1
              </span>
              <h2 class="text-xl font-bold font-display text-slate-900">
                اختر نوع المشروع الرقمي
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (type of estimator.projectTypes; track type.id) {
                <div 
                  (click)="estimator.selectedTypeId.set(type.id)"
                  class="p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden"
                  [class.bg-[#1E2A4A]]="estimator.selectedTypeId() === type.id"
                  [class.text-white]="estimator.selectedTypeId() === type.id"
                  [class.border-[#1E2A4A]]="estimator.selectedTypeId() === type.id"
                  [class.shadow-md]="estimator.selectedTypeId() === type.id"
                  [class.bg-slate-50]="estimator.selectedTypeId() !== type.id"
                  [class.border-slate-200]="estimator.selectedTypeId() !== type.id"
                  [class.text-slate-800]="estimator.selectedTypeId() !== type.id"
                >
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="font-bold font-display text-lg" [class.text-white]="estimator.selectedTypeId() === type.id" [class.text-slate-900]="estimator.selectedTypeId() !== type.id">
                      {{ type.title }}
                    </h3>
                    <span class="text-xs font-mono font-bold text-[#C1662F]">
                      من &#36;{{ type.basePrice }}
                    </span>
                  </div>
                  <p class="text-xs leading-relaxed mb-3" [class.text-slate-300]="estimator.selectedTypeId() === type.id" [class.text-slate-600]="estimator.selectedTypeId() !== type.id">
                    {{ type.description }}
                  </p>
                  <div class="text-[11px] font-mono font-semibold" [class.text-slate-300]="estimator.selectedTypeId() === type.id" [class.text-slate-500]="estimator.selectedTypeId() !== type.id">
                    المدة التقديرية: {{ type.estimatedDays }} يوم عمل
                  </div>
                </div>
              }
            </div>
          </div>


          <!-- STEP 2: ADDON FEATURES -->
          <div class="runx-card p-6 sm:p-8 space-y-6">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span class="w-8 h-8 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center text-sm">
                2
              </span>
              <h2 class="text-xl font-bold font-display text-slate-900">
                الميزات والإضافات المطلوبة
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (addon of estimator.availableAddons; track addon.id) {
                <div 
                  (click)="estimator.toggleAddon(addon.id)"
                  class="p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3"
                  [class.bg-[#1E2A4A]]="estimator.selectedAddonIds().includes(addon.id)"
                  [class.text-white]="estimator.selectedAddonIds().includes(addon.id)"
                  [class.border-[#1E2A4A]]="estimator.selectedAddonIds().includes(addon.id)"
                  [class.bg-slate-50]="!estimator.selectedAddonIds().includes(addon.id)"
                  [class.border-slate-200]="!estimator.selectedAddonIds().includes(addon.id)"
                  [class.text-slate-800]="!estimator.selectedAddonIds().includes(addon.id)"
                >
                  <div class="mt-0.5">
                    <input 
                      type="checkbox" 
                      [checked]="estimator.selectedAddonIds().includes(addon.id)" 
                      class="w-4 h-4 accent-[#C1662F] rounded cursor-pointer"
                    >
                  </div>
                  <div class="space-y-1">
                    <div class="flex items-center justify-between">
                      <h4 class="font-bold text-sm" [class.text-white]="estimator.selectedAddonIds().includes(addon.id)" [class.text-slate-900]="!estimator.selectedAddonIds().includes(addon.id)">
                        {{ addon.title }}
                      </h4>
                      <span class="text-xs font-mono font-bold text-[#C1662F]">
                        +&#36;{{ addon.price }}
                      </span>
                    </div>
                    <p class="text-xs" [class.text-slate-300]="estimator.selectedAddonIds().includes(addon.id)" [class.text-slate-600]="!estimator.selectedAddonIds().includes(addon.id)">
                      {{ addon.description }}
                    </p>
                  </div>
                </div>
              }
            </div>
          </div>


          <!-- STEP 3: TIMELINE SPEED -->
          <div class="runx-card p-6 sm:p-8 space-y-6">
            <div class="flex items-center gap-3 border-b border-slate-100 pb-4">
              <span class="w-8 h-8 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center text-sm">
                3
              </span>
              <h2 class="text-xl font-bold font-display text-slate-900">
                سرعة التنفيذ والتسليم
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              @for (t of estimator.timelineOptions; track t.id) {
                <div 
                  (click)="estimator.selectedTimelineId.set(t.id)"
                  class="p-5 rounded-2xl border transition-all cursor-pointer"
                  [class.bg-[#1E2A4A]]="estimator.selectedTimelineId() === t.id"
                  [class.text-white]="estimator.selectedTimelineId() === t.id"
                  [class.border-[#1E2A4A]]="estimator.selectedTimelineId() === t.id"
                  [class.bg-slate-50]="estimator.selectedTimelineId() !== t.id"
                  [class.border-slate-200]="estimator.selectedTimelineId() !== t.id"
                  [class.text-slate-800]="estimator.selectedTimelineId() !== t.id"
                >
                  <h4 class="font-bold text-base mb-1" [class.text-white]="estimator.selectedTimelineId() === t.id" [class.text-slate-900]="estimator.selectedTimelineId() !== t.id">
                    {{ t.title }}
                  </h4>
                  <p class="text-xs" [class.text-slate-300]="estimator.selectedTimelineId() === t.id" [class.text-slate-600]="estimator.selectedTimelineId() !== t.id">
                    {{ t.description }}
                  </p>
                </div>
              }
            </div>
          </div>

        </div>


        <!-- SUMMARY PANEL & SUBMIT FORM -->
        <div class="lg:col-span-4 sticky top-28 space-y-6">
          
          <div class="runx-card p-6 space-y-6 bg-slate-50 border-slate-200">
            
            <h3 class="text-lg font-bold font-display text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
              <span>ملخص تقدير المشروع</span>
              <span class="runx-glass-pill text-[10px]">فوري</span>
            </h3>

            <!-- Selected Type -->
            <div class="space-y-1 text-sm">
              <span class="text-xs text-slate-500">النوع المختار:</span>
              <div class="text-slate-900 font-bold font-display text-base">
                {{ estimator.currentType().title }}
              </div>
            </div>

            <!-- Addons Summary -->
            <div class="space-y-2 text-xs border-t border-b border-slate-200 py-3">
              <span class="text-slate-500">الإضافات المختارة ({{ estimator.selectedAddonsList().length }}):</span>
              <ul class="space-y-1 text-slate-700">
                @for (addon of estimator.selectedAddonsList(); track addon.id) {
                  <li class="flex items-center justify-between">
                    <span>• {{ addon.title }}</span>
                    <span class="font-mono font-bold text-[#C1662F]">+&#36;{{ addon.price }}</span>
                  </li>
                } @empty {
                  <li class="text-slate-400 italic">لم يتم تحديد إضافات</li>
                }
              </ul>
            </div>

            <!-- Calculated Totals -->
            <div class="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-500">الميزانية التقديرية:</span>
                <span class="text-2xl font-bold font-mono text-[#C1662F]">
                  &#36;{{ estimator.estimatedTotalPrice() }}
                </span>
              </div>

              <div class="flex items-center justify-between border-t border-slate-100 pt-2 text-xs">
                <span class="text-slate-500">مدة التسليم التقديرية:</span>
                <span class="font-bold text-slate-900 font-mono">
                  {{ estimator.estimatedTotalDays() }} يوم عمل
                </span>
              </div>
            </div>

            <!-- API Proposal Response Output -->
            @if (apiEstimateResponse(); as res) {
              <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 text-xs">
                <div class="text-emerald-800 font-bold flex items-center gap-1.5">
                  <span>✓</span>
                  <span>تم تأكيد العرض السعري عبر الـ API!</span>
                </div>
                
                <div class="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5 font-mono text-[11px] text-slate-700 dir-rtl">
                  <div class="flex justify-between">
                    <span class="text-slate-500">رقم المرجع:</span>
                    <span class="font-bold text-[#1E2A4A]">{{ res.estimateReference }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">تاريخ الإصدار:</span>
                    <span>{{ res.generatedAt }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-500">صالح حتى:</span>
                    <span>{{ res.validUntil }}</span>
                  </div>
                </div>

                <div>
                  <span class="text-slate-500 block mb-1 text-[11px]">حمولة الاستجابة من API Server:</span>
                  <pre class="bg-slate-900 text-emerald-400 p-2.5 rounded-lg font-mono text-[10px] overflow-x-auto text-left dir-ltr">{{ res | json }}</pre>
                </div>

                <button (click)="apiEstimateResponse.set(null)" class="btn-runx-outline text-xs w-full py-2">
                  إعادة التقدير
                </button>
              </div>
            } @else {
              <form [formGroup]="form" (ngSubmit)="submitEstimate()" class="space-y-3">
                <input 
                  type="text" 
                  formControlName="name" 
                  placeholder="الاسم الكريم *"
                  class="runx-input text-xs"
                >
                <input 
                  type="tel" 
                  formControlName="phone" 
                  placeholder="رقم الواتساب / الجوال *"
                  class="runx-input text-xs dir-ltr text-right"
                >
                <button 
                  type="submit" 
                  [disabled]="form.invalid || isSubmitting()"
                  class="btn-runx-primary w-full py-3 text-center justify-center font-bold text-sm disabled:opacity-50"
                >
                  @if (isSubmitting()) {
                    <span>جاري معالجة الطلب في API...</span>
                  } @else {
                    <span>طلب عرض سعر رسمي من الـ API</span>
                  }
                </button>
              </form>
            }

          </div>

        </div>

      </div>

    </div>
  `
})
export class CalculatorPage {
  private fb = inject(FormBuilder);
  public estimator = inject(EstimatorService);
  private apiService = inject(ApiService);

  public isSubmitting = signal<boolean>(false);
  public apiEstimateResponse = signal<EstimateSubmitResponse | null>(null);

  public form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.minLength(8)]]
  });

  public submitEstimate() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    const val = this.form.value;

    this.apiService.submitEstimate({
      projectType: this.estimator.currentType().title,
      addons: this.estimator.selectedAddonsList().map(a => a.title),
      timeline: this.estimator.currentTimeline().title,
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
