import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-14 sm:space-y-16">

      <!-- Header -->
      <div class="text-center space-y-3 max-w-3xl mx-auto">
        <span class="runx-glass-pill text-xs">خدمات البرمجة والتصميم</span>
        <h1 class="text-3xl sm:text-5xl font-bold font-display text-[#0F172A]">
          منظومة خدمات تقنية متكاملة
        </h1>
        <p class="subtext-lead max-w-2xl mx-auto text-slate-700 text-sm sm:text-base">
          نقدم في <strong class="text-[#0F172A] font-bold">runx tech</strong> حلولاً برمجية مخصصة للأفراد، المشاريع الناشئة والشركات الكبرى، مع الالتزام التام بأساسيات الجودة، الأمان والسرعة.
        </p>
      </div>

      <!-- Services Detailed Cards -->
      <div class="space-y-6 sm:space-y-12">
        @for (service of servicesService.services(); track service.id; let idx = $index) {
          <div [id]="service.id" class="runx-card p-4 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:border-[#C1662F]/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden">

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 items-start">

              <!-- Left Details Column (7 cols) -->
              <div class="lg:col-span-7 space-y-4 sm:space-y-5">

                <!-- Header: icon + title together, no duplicate icon/number pill -->
                <div class="flex items-start gap-3">
                  <div class="w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-[#1E2A4A] text-amber-400 flex items-center justify-center text-lg sm:text-2xl shadow-sm shrink-0">
                    <i class="bi" [class]="service.bootstrapIcon || 'bi-code-slash'"></i>
                  </div>
                  <div class="flex-1 min-w-0 space-y-0.5">
                    <h2 class="text-lg sm:text-3xl font-bold font-display text-[#0F172A] leading-snug">
                      {{ service.title }}
                    </h2>
                    <p class="text-[11px] sm:text-xs text-[#C1662F] font-bold">
                      {{ service.subtitle }}
                    </p>
                  </div>
                </div>

                <!-- Description -->
                <p class="subtext-section text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {{ service.description }}
                </p>

                <!-- Features List: flat divided list instead of boxed grid, avoids nested-card clutter on mobile -->
                <div class="space-y-2 pt-1">
                  <h4 class="text-[11px] sm:text-xs font-bold text-[#C1662F] tracking-wider uppercase flex items-center gap-1.5">
                    <i class="bi bi-stars"></i>
                    <span>مميزات الخدمة الرئيسية</span>
                  </h4>
                  <ul class="divide-y divide-slate-100 border-y border-slate-100">
                    @for (feat of service.features; track feat) {
                      <li class="flex items-center gap-2.5 text-xs sm:text-sm text-slate-800 font-semibold py-2.5">
                        <i class="bi bi-check-circle-fill text-[#C1662F] shrink-0 text-sm"></i>
                        <span>{{ feat }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <!-- Tech Stack Tags -->
                <div class="pt-1 flex flex-wrap items-center gap-1.5">
                  <span class="subtext-muted text-slate-500 font-bold text-[11px]">التقنيات:</span>
                  @for (tech of service.technologies; track tech) {
                    <span class="runx-tag text-[11px] sm:text-xs">
                      {{ tech }}
                    </span>
                  }
                </div>

              </div>

              <!-- Right: single price panel + CTAs (was two separate price displays before) -->
              <div class="lg:col-span-5 flex flex-col space-y-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">

                <div class="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-white to-slate-50/80 border border-slate-200/90 shadow-xs space-y-3">
                  <div class="flex items-center justify-between gap-2 flex-wrap">
                    <span class="text-[11px] text-slate-500 font-medium">التكلفة التقديرية تبدأ من</span>
                    <span class="text-[10px] font-mono font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap">
                      ضمان واستقرار 99.9%
                    </span>
                  </div>
                  <div class="text-2xl sm:text-3xl font-bold font-mono text-[#C1662F]">
                    {{ service.priceStart }}
                  </div>
                </div>

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
      <section class="py-10 sm:py-12 border-t border-slate-200">
        <div class="text-center space-y-3 mb-8 sm:mb-12">
          <span class="runx-glass-pill text-xs">منهجية العمل</span>
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#0F172A]">
            كيف نحول أفكارك إلى واقع رقمي ملموس؟
          </h2>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          <div class="runx-card p-4 sm:p-6 text-center space-y-2.5 sm:space-y-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-xs sm:text-sm">1</div>
            <h3 class="font-bold text-[#0F172A] font-display text-sm sm:text-base">الاكتشاف والتخطيط</h3>
            <p class="subtext-card text-slate-600 text-xs sm:text-sm">تحليل المتطلبات وتحديد نطاق العمل والتقنيات المناسبة.</p>
          </div>

          <div class="runx-card p-4 sm:p-6 text-center space-y-2.5 sm:space-y-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-xs sm:text-sm">2</div>
            <h3 class="font-bold text-[#0F172A] font-display text-sm sm:text-base">تصميم UI/UX</h3>
            <p class="subtext-card text-slate-600 text-xs sm:text-sm">بناء الواجهات التفاعلية وفق هوية المنشأة وتجربة المستخدم.</p>
          </div>

          <div class="runx-card p-4 sm:p-6 text-center space-y-2.5 sm:space-y-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-xs sm:text-sm">3</div>
            <h3 class="font-bold text-[#0F172A] font-display text-sm sm:text-base">التطوير والبرمجة</h3>
            <p class="subtext-card text-slate-600 text-xs sm:text-sm">كتابة كود نظيف، ربط قواعد البيانات وواجهات APIs.</p>
          </div>

          <div class="runx-card p-4 sm:p-6 text-center space-y-2.5 sm:space-y-3">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-xs sm:text-sm">4</div>
            <h3 class="font-bold text-[#0F172A] font-display text-sm sm:text-base">الاختبار والأمان</h3>
            <p class="subtext-card text-slate-600 text-xs sm:text-sm">فحص الأداء، الأمان، وتوافق كافة الشاشات والأجهزة.</p>
          </div>

          <div class="runx-card p-4 sm:p-6 text-center space-y-2.5 sm:space-y-3 col-span-2 lg:col-span-1">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#1E2A4A] text-white font-mono font-bold flex items-center justify-center mx-auto text-xs sm:text-sm">5</div>
            <h3 class="font-bold text-[#0F172A] font-display text-sm sm:text-base">الإطلاق والدعم</h3>
            <p class="subtext-card text-slate-600 text-xs sm:text-sm">نشر السيرفرات والتسليم النهائي مع صيانة مستمرة.</p>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ServicesPage {
  public servicesService = inject(ServicesService);
}