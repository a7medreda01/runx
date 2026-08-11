import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-16">
      
      <!-- Header -->
      <div class="text-center space-y-3 max-w-3xl mx-auto">
        <span class="runx-glass-pill text-xs">خدمات البرمجة والتصميم</span>
        <h1 class="text-4xl sm:text-5xl font-bold font-display text-[#0F172A]">
          منظومة خدمات تقنية متكاملة
        </h1>
        <p class="subtext-lead max-w-2xl mx-auto text-slate-700">
          نقدم في <strong class="text-[#0F172A] font-bold">runx tech</strong> حلولاً برمجية مخصصة للأفراد، المشاريع الناشئة والشركات الكبرى، مع الالتزام التام بأساسيات الجودة، الأمان والسرعة.
        </p>
      </div>

      <!-- Services Detailed Cards -->
      <div class="space-y-8 sm:space-y-12">
        @for (service of servicesService.services(); track service.id; let idx = $index) {
          <div [id]="service.id" class="runx-card p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#C1662F]/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
              
              <!-- Left Details Column (7 cols) -->
              <div class="lg:col-span-7 space-y-5">
                
                <!-- Card Header Tag Row -->
                <div class="flex items-center justify-between gap-3 flex-wrap">
                  <div class="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 text-[#C1662F] font-mono text-xs font-bold border border-slate-200/80">
                    <i class="bi" [class]="service.bootstrapIcon || 'bi-code-slash'"></i>
                    <span>0{{ idx + 1 }}</span>
                    <span class="text-slate-300">/</span>
                    <span>RUNX SERVICE</span>
                  </div>

                  <span class="text-xs font-mono font-bold text-[#C1662F] bg-[#C1662F]/10 px-3 py-1 rounded-full border border-[#C1662F]/20">
                    تبدأ من {{ service.priceStart }}
                  </span>
                </div>

                <!-- Service Title & Description -->
                <div class="space-y-2">
                  <h2 class="text-xl sm:text-3xl font-bold font-display text-[#0F172A] leading-snug">
                    {{ service.title }}
                  </h2>
                  <p class="text-xs text-[#C1662F] font-bold">
                    {{ service.subtitle }}
                  </p>
                  <p class="subtext-section text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {{ service.description }}
                  </p>
                </div>

                <!-- Features List -->
                <div class="space-y-2.5 pt-1">
                  <h4 class="text-xs font-bold text-[#C1662F] tracking-wider uppercase flex items-center gap-1.5">
                    <i class="bi bi-stars"></i>
                    <span>مميزات الخدمة الرئيسية:</span>
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    @for (feat of service.features; track feat) {
                      <div class="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold bg-slate-50/90 p-2.5 sm:p-3 rounded-xl border border-slate-200/80">
                        <i class="bi bi-check-circle-fill text-[#C1662F] shrink-0 text-sm"></i>
                        <span>{{ feat }}</span>
                      </div>
                    }
                  </div>
                </div>

                <!-- Tech Stack Tags -->
                <div class="pt-2 flex flex-wrap items-center gap-1.5">
                  <span class="subtext-muted text-slate-500 font-bold text-xs">التقنيات:</span>
                  @for (tech of service.technologies; track tech) {
                    <span class="runx-tag text-[11px] sm:text-xs">
                      {{ tech }}
                    </span>
                  }
                </div>

              </div>

              <!-- Right Icon & Price Banner (5 cols) -->
              <div class="lg:col-span-5 flex flex-col space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                
                <div class="relative p-5 sm:p-6 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50/80 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-4">
                  <div class="flex items-center justify-between">
                    <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#1E2A4A] text-amber-400 flex items-center justify-center text-2xl sm:text-3xl shadow-md shrink-0">
                      <i class="bi" [class]="service.bootstrapIcon || 'bi-code-slash'"></i>
                    </div>

                    <span class="text-[11px] font-mono font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                      ضمان واستقرار 99.9%
                    </span>
                  </div>

                  <div class="pt-3 border-t border-slate-200/80 flex items-baseline justify-between">
                    <span class="text-xs text-slate-500 font-medium">التكلفة التقديرية تبدأ من:</span>
                    <span class="text-xl sm:text-2xl font-bold font-mono text-[#C1662F]">
                      {{ service.priceStart }}
                    </span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a routerLink="/calculator" class="btn-runx-primary w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs">
                    <i class="bi bi-calculator"></i>
                    <span>احسب الكلفة</span>
                  </a>
                  <a routerLink="/contact" class="btn-runx-outline w-full py-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2">
                    <i class="bi bi-chat-dots"></i>
                    <span>استشارة مجانية</span>
                  </a>
                </div>

              </div>

            </div>

          </div>
        }
      </div>


      <!-- METHODOLOGY SECTION -->
      <section class="py-12 border-t border-slate-200">
        <div class="text-center space-y-3 mb-12">
          <span class="runx-glass-pill text-xs">منهجية العمل</span>
          <h2 class="text-3xl font-bold font-display text-[#0F172A]">
            كيف نحول أفكارك إلى واقع رقمي ملموس؟
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div class="runx-card p-6 text-center space-y-3">
            <div class="w-10 h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-sm">1</div>
            <h3 class="font-bold text-[#0F172A] font-display">الاكتشاف والتخطيط</h3>
            <p class="subtext-card text-slate-600">تحليل المتطلبات وتحديد نطاق العمل والتقنيات المناسبة.</p>
          </div>

          <div class="runx-card p-6 text-center space-y-3">
            <div class="w-10 h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-sm">2</div>
            <h3 class="font-bold text-[#0F172A] font-display">تصميم UI/UX</h3>
            <p class="subtext-card text-slate-600">بناء الواجهات التفاعلية وفق هوية المنشأة وتجربة المستخدم.</p>
          </div>

          <div class="runx-card p-6 text-center space-y-3">
            <div class="w-10 h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-sm">3</div>
            <h3 class="font-bold text-[#0F172A] font-display">التطوير والبرمجة</h3>
            <p class="subtext-card text-slate-600">كتابة كود نظيف، ربط قواعد البيانات وواجهات APIs.</p>
          </div>

          <div class="runx-card p-6 text-center space-y-3">
            <div class="w-10 h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-sm">4</div>
            <h3 class="font-bold text-[#0F172A] font-display">الاختبار والأمان</h3>
            <p class="subtext-card text-slate-600">فحص الأداء، الأمان، وتوافق كافة الشاشات والأجهزة.</p>
          </div>

          <div class="runx-card p-6 text-center space-y-3">
            <div class="w-10 h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-sm">5</div>
            <h3 class="font-bold text-[#0F172A] font-display">الإطلاق والدعم</h3>
            <p class="subtext-card text-slate-600">نشر السيرفرات والتسليم النهائي مع صيانة مستمرة.</p>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ServicesPage {
  public servicesService = inject(ServicesService);
}
