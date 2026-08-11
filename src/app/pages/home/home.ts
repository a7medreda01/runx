import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { ServicesService } from '../../core/services/services.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="relative text-slate-800">
      
<!-- HERO SECTION -->
<section class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">

  <!-- Banner Image - shows FIRST on mobile, below the navbar with matching side margins,
       moves to the side column on desktop -->
  <div class="lg:hidden mb-8">
    <img 
      src="/banner.png" 
      alt="runx tech banner" 
      class="w-full h-auto object-cover "
      referrerpolicy="no-referrer"
    >
  </div>

  <div class="max-w-7xl mx-auto">
    
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      
      <!-- Hero Content -->
      <div class="lg:col-span-7 space-y-6 text-right">
        


        <!-- Main Title -->
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-display leading-[1.25] sm:leading-[1.2] text-[#0F172A] tracking-tight">
          نبتكر ونبني <span class="bg-gradient-to-r from-[#FF5E3A] via-[#E8336D] to-[#7B1FA2] bg-clip-text text-transparent">حلولاً رقمية</span> فائقة الجودة والأداء
        </h1>

        <!-- Subtitle -->
        <p class="subtext-lead max-w-2xl text-slate-700">
          شركة <strong class="text-[#0F172A] font-extrabold">RunX</strong> متخصصة في تصميم وتطوير المواقع المخصصة، المتاجر الإلكترونية، وتطبيقات الجوال والأنظمة السحابية برؤية هندسية احترافية تتجاوز التوقعات.
        </p>

        <!-- CTAs -->
        <div class="flex flex-col sm:flex-row items-center gap-4 pt-2">
          <a 
            routerLink="/calculator" 
            class="btn-runx-primary text-base px-8 py-3.5 w-full sm:w-auto text-center font-bold"
          >
            <span>احسب كلفة مشروعك الآن</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>

          <a 
            routerLink="/projects" 
            class="btn-runx-outline text-base px-8 py-3.5 w-full sm:w-auto text-center font-semibold"
          >
            <span>استكشف معرض أعمالنا</span>
          </a>
        </div>

        <!-- Key Trust Features -->
        <div class="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 text-right">
          <div>
            <span class="block text-2xl font-bold font-mono text-[#0F172A]">100+</span>
            <span class="subtext-muted text-slate-600 font-semibold">مشروع برمجيات مُسّلم</span>
          </div>
          <div>
            <span class="block text-2xl font-bold font-mono text-[#C1662F]">99.8%</span>
            <span class="subtext-muted text-slate-600 font-semibold">نسبة جودة الرضا</span>
          </div>
          <div>
            <span class="block text-2xl font-bold font-mono text-[#0F172A]">0.8s</span>
            <span class="subtext-muted text-slate-600 font-semibold">سرعة أداء خرافية</span>
          </div>
        </div>

      </div>

      <!-- Banner Image - Desktop only (in the column, no border/text/overlay) -->
      <div class="hidden lg:block lg:col-span-5">
        <img 
          src="/banner.png" 
          alt="runx tech banner" 
          class="w-full h-auto object-cover rounded-2xl"
          referrerpolicy="no-referrer"
        >
      </div>

    </div>

  </div>
</section>


      <!-- BRAND ADVANTAGES -->
      <section class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80 border-y border-slate-200/80">
        <div class="max-w-7xl mx-auto">
          
          <div class="text-center space-y-3 mb-14">
            <span class="runx-glass-pill text-xs">لماذا تختار runx tech؟</span>
            <h2 class="text-3xl sm:text-4xl font-bold font-display text-[#0F172A]">
              معايير هندسية صارمة تُحقق نتائج حقيقية
            </h2>
            <p class="subtext-section max-w-2xl mx-auto">
              نحن لا نقدم مجرد تصميم مواقع؛ بل نبتكر بنية برمجية متطورة تدعم نمو أعمالك وتضمن التوسع السلس.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div class="runx-card p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-[#1E2A4A] text-white flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold font-display text-[#0F172A]">سرعة وأداء ناري</h3>
              <p class="subtext-card text-slate-700">
                كتابة أكواد نظيفة متوافقة مع أحدث المعايير البرمجية لتسريع زمن الاستجابة والتحميل وتصدر محركات البحث.
              </p>
            </div>

            <div class="runx-card p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-[#1E2A4A] text-white flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold font-display text-[#0F172A]">أمان وحماية حتمية</h3>
              <p class="subtext-card text-slate-700">
                تشفير كامل للبيانات وقواعد البيانات وحماية عالية ضد الثغرات الإلكترونية والقرصنة لضمان الاستقرار.
              </p>
            </div>

            <div class="runx-card p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-[#1E2A4A] text-white flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 class="text-lg font-bold font-display text-[#0F172A]">هوية بصرية مخصصة</h3>
              <p class="subtext-card text-slate-700">
                تصميم فريد 100% يعبر عن هوية علامتك التجارية بدون استخدام قوالب جاهزة مكررة.
              </p>
            </div>

            <div class="runx-card p-6 space-y-4">
              <div class="w-12 h-12 rounded-xl bg-[#1E2A4A] text-white flex items-center justify-center shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-bold font-display text-[#0F172A]">دعم وصيانة مستمرة</h3>
              <p class="subtext-card text-slate-700">
                متابعة دورية تحديثات مستمرة وفريق دعم فني متواجد لمساعدتك وحل أي طارئ بسرعة كافية.
              </p>
            </div>

          </div>

        </div>
      </section>


      <!-- SERVICES HIGHLIGHT -->
      <section class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        <div class="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div class="space-y-2 sm:space-y-3 max-w-2xl">
            <span class="runx-glass-pill text-xs">خدماتنا البرمجية الرئيسية</span>
            <h2 class="text-2xl sm:text-4xl font-bold font-display text-[#0F172A] leading-snug">
              حلول تقنية شاملة تغطي كافة تطلعاتك
            </h2>
          </div>
          <a routerLink="/services" class="btn-runx-outline shrink-0 flex items-center gap-2 text-xs sm:text-sm">
            <span>عرض كافة الخدمات والتفاصيل</span>
            <i class="bi bi-arrow-left"></i>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          @for (service of servicesService.services(); track service.id) {
            <div class="runx-card relative group overflow-hidden rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-8 border border-slate-200/90 hover:border-[#C1662F]/40 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              
              <div>
                <!-- Top Row: Vector Icon Box & Price Badge -->
                <div class="flex items-start justify-between mb-5 sm:mb-6 relative z-10 gap-3">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#1E2A4A] border border-[#1E2A4A] text-amber-400 flex items-center justify-center text-2xl sm:text-3xl shadow-md group-hover:bg-[#C1662F] group-hover:border-[#C1662F] group-hover:text-white transition-all duration-300 shrink-0">
                    <i class="bi" [class]="service.bootstrapIcon || 'bi-code-slash'"></i>
                  </div>

                  <div class="flex flex-col items-end gap-1">
                    <span class="px-3 py-1 rounded-full bg-slate-100 text-[#C1662F] text-xs font-mono font-bold border border-slate-200 shadow-xs">
                      {{ service.priceStart }}
                    </span>
                    <span class="text-[10px] font-mono font-bold text-slate-400 tracking-wider">0{{ $index + 1 }} / SERVICE</span>
                  </div>
                </div>

                <!-- Title & Subtitle -->
                <div class="space-y-1.5 mb-4 relative z-10">
                  <h3 class="text-lg sm:text-2xl font-bold font-display text-[#0F172A] group-hover:text-[#C1662F] transition-colors leading-snug">
                    {{ service.title }}
                  </h3>
                  <p class="text-xs text-[#C1662F] font-bold">
                    {{ service.subtitle }}
                  </p>
                  <p class="subtext-card text-slate-600 leading-relaxed text-xs sm:text-sm pt-1">
                    {{ service.description }}
                  </p>
                </div>

                <!-- Features bullet list -->
                <ul class="space-y-2 py-3 sm:py-4 border-t border-slate-100 relative z-10">
                  @for (feat of service.features.slice(0, 3); track feat) {
                    <li class="flex items-center gap-2 text-slate-800 font-semibold text-xs sm:text-sm">
                      <i class="bi bi-check-circle-fill text-[#C1662F] shrink-0 text-sm"></i>
                      <span>{{ feat }}</span>
                    </li>
                  }
                </ul>
              </div>

              <!-- Card Action Footer -->
              <div class="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10 mt-2">
                <a [routerLink]="['/services']" class="text-xs sm:text-sm font-bold text-[#1E2A4A] hover:text-[#C1662F] flex items-center gap-1.5 transition-colors">
                  <span>التفاصيل الكاملة</span>
                  <i class="bi bi-arrow-left"></i>
                </a>
                <a routerLink="/calculator" class="btn-runx-primary text-xs py-2 px-3.5 font-bold shadow-xs">
                  <span>طلب تقدير</span>
                </a>
              </div>

            </div>
          }
        </div>

      </section>


      <!-- FEATURED PROJECTS SHOWCASE WITH REAL IMAGES -->
      <section class="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/80 border-t border-slate-200/80">
        <div class="max-w-7xl mx-auto">
          
          <div class="text-center space-y-2 sm:space-y-3 mb-10 sm:mb-14">
            <span class="runx-glass-pill text-xs">سجل إنجازاتنا</span>
            <h2 class="text-2xl sm:text-4xl font-bold font-display text-[#0F172A]">
              مشاريع استثنائية صنعناها بعناية
            </h2>
            <p class="subtext-section max-w-2xl mx-auto text-xs sm:text-sm text-slate-600">
              تصفح نماذج حية لمشاريع نفذها فريق runx tech للعملاء والشركات في المملكة والخليج.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            @for (project of projectsService.featuredProjects(); track project.id) {
              <div 
                [routerLink]="['/projects', project.id]"
                class="runx-card overflow-hidden group cursor-pointer flex flex-col justify-between rounded-2xl sm:rounded-3xl border border-slate-200/90 hover:border-[#C1662F]/40 shadow-xs transition-all duration-300"
              >
                <div>
                  <!-- Thumbnail Image -->
                  <div class="relative h-48 sm:h-52 bg-slate-100 overflow-hidden">
                    <img 
                      [src]="project.imageUrl" 
                      [alt]="project.title" 
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerpolicy="no-referrer"
                    >
                    <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-[#C1662F] text-xs font-bold shadow-xs border border-slate-200">
                      {{ project.categoryLabel }}
                    </span>
                  </div>

                  <!-- Info -->
                  <div class="p-5 sm:p-6 space-y-3">
                    <h3 class="text-lg sm:text-xl font-bold font-display text-[#0F172A] group-hover:text-[#C1662F] transition-colors leading-snug">
                      {{ project.title }}
                    </h3>
                    <p class="subtext-card text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {{ project.summary }}
                    </p>

                    <div class="flex flex-wrap gap-1.5 pt-1">
                      @for (tech of project.technologies.slice(0, 3); track tech) {
                        <span class="runx-tag text-[11px] sm:text-xs">
                          {{ tech }}
                        </span>
                      }
                    </div>
                  </div>
                </div>

                <div class="p-4 sm:p-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>العميل: {{ project.client }}</span>
                  <span class="text-[#C1662F] font-bold flex items-center gap-1">
                    <span>التفاصيل</span>
                    <i class="bi bi-arrow-left"></i>
                  </span>
                </div>

              </div>
            }
          </div>

          <div class="text-center mt-8 sm:mt-12">
            <a routerLink="/projects" class="btn-runx-primary px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-base font-bold">
              <span>عرض جميع الأعمال والمشاريع</span>
            </a>
          </div>

        </div>
      </section>


      <!-- CTA CALCULATOR PROMO -->
      <section class="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-[#C1662F]/30 bg-gradient-to-br from-[#1E2A4A] via-[#16213A] to-[#0F172A] text-white shadow-2xl">
          <!-- Background Glow -->
          <div class="absolute -top-24 -left-24 w-60 h-60 bg-[#C1662F]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            
            <div class="lg:col-span-2 space-y-4">
              <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E28A4A] border border-white/10">
                <i class="bi bi-calculator-fill text-[#C1662F]"></i>
                <span>حاسبة المشروعات الرقمية الذكية</span>
              </span>
              <h2 class="text-2xl sm:text-4xl font-bold font-display text-white leading-tight">
                هل تريد معرفة الكلفة والمدة التقديرية لمشروعك فوراً؟
              </h2>
              <p class="subtext-section text-slate-200 max-w-2xl">
                استخدم حاسبة <strong class="text-white font-extrabold">runx tech</strong> الذكية لاختيار نوع التطبيق أو الموقع، الميزات المطلوبة والجدول الزمني للحصول على تقدير فوري وشفاف.
              </p>
            </div>

            <div class="flex justify-start lg:justify-end">
              <a routerLink="/calculator" class="btn-runx-primary text-sm sm:text-base px-8 py-4 font-bold whitespace-nowrap flex items-center gap-3 transition-all">
                <span>ابدأ التقدير الفوري الآن</span>
                <i class="bi bi-arrow-left text-lg"></i>
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  `
})
export class HomePage {
  public projectsService = inject(ProjectsService);
  public servicesService = inject(ServicesService);

  public selectedModalProject = signal<Project | null>(null);
}