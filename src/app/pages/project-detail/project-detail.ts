import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (isLoading()) {
      <div class="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20">
        <div class="w-12 h-12 border-4 border-[#C1662F] border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-slate-600 font-medium">جاري تحميل تفاصيل المشروع...</p>
      </div>
    } @else if (project(); as proj) {
      <div class="pt-28 pb-20 bg-[#F8FAFC]">
        
        <!-- Breadcrumbs & Navigation -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div class="flex items-center justify-between flex-wrap gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <nav class="flex items-center gap-2 text-sm text-slate-600">
              <a routerLink="/" class="hover:text-[#C1662F] transition-colors">الرئيسية</a>
              <span class="text-slate-400">/</span>
              <a routerLink="/projects" class="hover:text-[#C1662F] transition-colors">معرض الأعمال</a>
              <span class="text-slate-400">/</span>
              <span class="text-[#0F172A] font-semibold line-clamp-1">{{ proj.title }}</span>
            </nav>

            <a routerLink="/projects" class="inline-flex items-center gap-2 text-sm font-bold text-[#1E2A4A] hover:text-[#C1662F] transition-colors bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span>العودة للمعرض</span>
            </a>
          </div>
        </div>

        <!-- Project Hero Header -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div class="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              <!-- Left Details (Spans 2 cols) -->
              <div class="lg:col-span-2 space-y-6">
                <div class="flex items-center gap-3 flex-wrap">
                  <span class="runx-glass-pill text-xs font-bold">
                    {{ proj.categoryLabel }}
                  </span>
                  @if (proj.year) {
                    <span class="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-mono font-bold">
                      سنة التنفيذ: {{ proj.year }}
                    </span>
                  }
                  @if (proj.featured) {
                    <span class="px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold flex items-center gap-1">
                      <span>★</span> مشروع مميز
                    </span>
                  }
                </div>

                <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F172A] leading-tight">
                  {{ proj.title }}
                </h1>

                <p class="subtext-lead text-slate-700">
                  {{ proj.description }}
                </p>

                <!-- Project Specs List -->
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-sm">
                  <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span class="text-xs text-slate-500 block">العميل / الجهة</span>
                    <strong class="text-[#0F172A] font-bold mt-0.5 block">{{ proj.client }}</strong>
                  </div>
                  @if (proj.duration) {
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <span class="text-xs text-slate-500 block">مدة التنفيذ</span>
                      <strong class="text-[#0F172A] font-bold mt-0.5 block">{{ proj.duration }}</strong>
                    </div>
                  }
                  @if (proj.role) {
                    <div class="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                      <span class="text-xs text-slate-500 block">دور runx tech</span>
                      <strong class="text-[#0F172A] font-bold mt-0.5 block line-clamp-1">{{ proj.role }}</strong>
                    </div>
                  }
                </div>
              </div>

              <!-- Action Card Column -->
              <div class="bg-[#0F172A] text-white p-6 sm:p-8 rounded-2xl space-y-6 flex flex-col justify-between h-full border border-slate-800 shadow-md">
                <div>
                  <h3 class="text-lg font-bold font-display text-white mb-2">
                    هل تريد تجربة الحل بنفسك؟
                  </h3>
                  <p class="text-slate-300 text-xs leading-relaxed">
                    يمكنك استعراض النسخة الحية للمشروع أو التواصل مع فريقنا لبناء حل مخصص يناسب منشأتك.
                  </p>
                </div>

                <div class="space-y-3 pt-4">
                  @if (proj.liveUrl) {
                    <a 
                      [href]="proj.liveUrl" 
                      target="_blank" 
                      class="btn-runx-primary w-full text-center text-sm py-3 font-bold"
                    >
                      <span>معاينة المنصة الحية ↗</span>
                    </a>
                  }

                  <a 
                    routerLink="/calculator" 
                    class="btn-runx-outline w-full text-center text-sm py-3 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                  >
                    <span>احسب كلفة مشروع مشابه</span>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Metrics Showcase Bar -->
        @if (proj.metrics && proj.metrics.length > 0) {
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              @for (metric of proj.metrics; track metric.label) {
                <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span class="text-xs font-semibold text-slate-500 block uppercase tracking-wider mb-1">
                      {{ metric.label }}
                    </span>
                    <span class="text-3xl font-extrabold text-[#C1662F] font-mono">
                      {{ metric.value }}
                    </span>
                  </div>
                  <div class="w-12 h-12 rounded-xl bg-[#FDF6F0] border border-[#C1662F]/20 flex items-center justify-center text-[#C1662F]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              }
            </div>
          </div>
        }

        <!-- Gallery Showcase & Lightbox -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 class="text-2xl font-bold text-[#0F172A] font-display">
                  معرض واجهات المشروع وصور التطبيق
                </h2>
                <p class="text-slate-500 text-sm mt-1">
                  اضغط على أي صورة لتكبيرها واستعراض تفاصيل التصميم بدقة عالية
                </p>
              </div>

              <span class="text-xs font-mono font-semibold bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg">
                {{ gallery().length }} صور توضيحية
              </span>
            </div>

            <!-- Main High-Res Image View -->
            <div class="relative rounded-2xl overflow-hidden bg-slate-900 aspect-video group cursor-pointer border border-slate-200 shadow-inner" (click)="openLightbox(activeImageIndex())">
              <img 
                [src]="activeImage()" 
                [alt]="proj.title" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerpolicy="no-referrer"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-6">
                <span class="text-white text-sm font-semibold flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  انقر للتكبير والشاشة الكاملة
                </span>
              </div>
            </div>

            <!-- Thumbnail Selector Strip -->
            @if (gallery().length > 1) {
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                @for (img of gallery(); track $index) {
                  <button 
                    (click)="activeImageIndex.set($index)" 
                    class="relative rounded-xl overflow-hidden aspect-video border-2 transition-all p-0.5 focus:outline-none"
                    [class.border-[#C1662F]]="activeImageIndex() === $index"
                    [class.ring-2]="activeImageIndex() === $index"
                    [class.ring-[#C1662F]/30]="activeImageIndex() === $index"
                    [class.border-slate-200]="activeImageIndex() !== $index"
                    [class.opacity-70]="activeImageIndex() !== $index"
                  >
                    <img [src]="img" [alt]="proj.title" class="w-full h-full object-cover rounded-lg" referrerpolicy="no-referrer">
                  </button>
                }
              </div>
            }
          </div>
        </div>

        <!-- Project Details Grid: Key Features, Challenges, Technologies -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <!-- Right Column: Key Features & Solutions (2 cols) -->
            <div class="lg:col-span-2 space-y-8">
              
              <!-- Features Section -->
              @if (proj.keyFeatures && proj.keyFeatures.length > 0) {
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 class="text-2xl font-bold text-[#0F172A] font-display border-r-4 border-[#C1662F] pr-4">
                    أبرز المميزات التي تم بناءها
                  </h3>
                  
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    @for (feat of proj.keyFeatures; track feat) {
                      <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                        <div class="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-sm">
                          ✓
                        </div>
                        <p class="text-slate-700 text-sm font-medium leading-relaxed">
                          {{ feat }}
                        </p>
                      </div>
                    }
                  </div>
                </div>
              }

              <!-- Challenges and Engineering Solutions -->
              @if (proj.challengeSolution && proj.challengeSolution.length > 0) {
                <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 class="text-2xl font-bold text-[#0F172A] font-display border-r-4 border-[#1E2A4A] pr-4">
                    التحديات البرمجية والحلول الهندسية
                  </h3>

                  <div class="space-y-4">
                    @for (cs of proj.challengeSolution; track cs.challenge) {
                      <div class="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                        <div class="flex items-start gap-2 text-rose-700 font-semibold text-sm">
                          <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-xs">التحدي:</span>
                          <p class="leading-relaxed">{{ cs.challenge }}</p>
                        </div>
                        <div class="flex items-start gap-2 text-emerald-800 font-semibold text-sm pt-2 border-t border-slate-200">
                          <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs">الحل:</span>
                          <p class="leading-relaxed">{{ cs.solution }}</p>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

            </div>

            <!-- Left Sidebar Column: Tech Stack & CTA -->
            <div class="space-y-8">
              
              <!-- Technologies Card -->
              <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
                <h3 class="text-xl font-bold text-[#0F172A] font-display border-r-3 border-[#C1662F] pr-3">
                  التقنيات المستخدمة
                </h3>

                <div class="flex flex-wrap gap-2">
                  @for (tech of proj.technologies; track tech) {
                    <span class="runx-tag text-xs font-semibold px-3 py-1.5 bg-slate-100 text-slate-800 border-slate-200">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>

              <!-- CTA Card -->
              <div class="relative overflow-hidden bg-gradient-to-br from-[#1E2A4A] via-[#16213A] to-[#0F172A] text-white rounded-3xl p-6 sm:p-8 border border-[#C1662F]/30 shadow-2xl space-y-6 group">
                <!-- Background Glow Accent -->
                <div class="absolute -top-20 -left-20 w-44 h-44 bg-[#C1662F]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#C1662F]/35 transition-all duration-700"></div>
                <div class="absolute -bottom-20 -right-20 w-44 h-44 bg-[#1E2A4A]/60 rounded-full blur-3xl pointer-events-none"></div>

                <!-- Icon & Badge Header -->
                <div class="flex items-center justify-between relative z-10 gap-3">
                  <div class="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#C1662F] to-[#A8521F] text-white flex items-center justify-center shadow-lg shadow-[#C1662F]/30 ring-4 ring-[#C1662F]/15 shrink-0">
                    <i class="bi bi-lightning-charge-fill text-2xl sm:text-3xl text-amber-200"></i>
                  </div>
                  <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#C1662F]/15 border border-[#C1662F]/30 text-xs font-bold text-[#E28A4A]">
                    <i class="bi bi-patch-check-fill text-[#C1662F]"></i>
                    <span>استشارة مجانية 100%</span>
                  </span>
                </div>

                <!-- Title & Content -->
                <div class="space-y-3 relative z-10">
                  <h3 class="text-2xl sm:text-3xl font-bold font-display leading-tight text-white drop-shadow-sm">
                    جاهز لتحويل فكرتك إلى واقع تقني فاخر؟
                  </h3>
                  <p class="subtext-card text-slate-200 font-medium leading-relaxed">
                    احصل على استشارة تقنية مجانية مع مهندسي <strong class="text-white font-extrabold">runx tech</strong> لدراسة متطلبات مشروعك، التكلفة، والجدول الزمني التقديري.
                  </p>
                </div>

                <!-- Key Highlights -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-white/10 relative z-10 text-xs text-slate-200 font-semibold">
                  <div class="flex items-center gap-2">
                    <i class="bi bi-check-circle-fill text-[#C1662F]"></i>
                    <span>تحليل الجدوى الفنية</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <i class="bi bi-check-circle-fill text-[#C1662F]"></i>
                    <span>بدون أي التزام مالي</span>
                  </div>
                </div>

                <!-- Action Button -->
                <div class="pt-2 relative z-10">
                  <a routerLink="/contact" class="btn-runx-primary w-full text-center py-3.5 sm:py-4 px-6 text-sm sm:text-base font-bold flex items-center justify-center gap-2.5 rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300">
                    <span>احجز موعد استشارة الآن</span>
                    <i class="bi bi-arrow-left text-lg"></i>
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- Lightbox Fullscreen Modal -->
        @if (lightboxOpen()) {
          <div class="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" (click)="closeLightbox()">
            <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" (click)="$event.stopPropagation()">
              <button 
                (click)="closeLightbox()" 
                class="absolute -top-12 left-0 text-white hover:text-[#C1662F] text-2xl font-bold bg-white/10 w-10 h-10 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              <img 
                [src]="gallery()[activeImageIndex()]" 
                [alt]="proj.title" 
                class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                referrerpolicy="no-referrer"
              >

              @if (gallery().length > 1) {
                <div class="flex items-center gap-4 mt-6">
                  <button (click)="prevImage()" class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-bold">
                    ‹ الصورة السابقة
                  </button>
                  <span class="text-white text-xs font-mono">
                    {{ activeImageIndex() + 1 }} / {{ gallery().length }}
                  </span>
                  <button (click)="nextImage()" class="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-sm font-bold">
                    الصورة التالية ›
                  </button>
                </div>
              }
            </div>
          </div>
        }

      </div>
    } @else {
      <!-- Not Found State -->
      <div class="min-h-[70vh] flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center">
        <div class="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-3xl mb-4">
          🔍
        </div>
        <h2 class="text-2xl font-bold text-[#0F172A] mb-2 font-display">لم يتم العثور على المشروع</h2>
        <p class="text-slate-500 text-sm max-w-md mb-6">
          عذراً، قد يكون الرابط خاطئاً أو تم نقل المشروع إلى قسم آخر.
        </p>
        <a routerLink="/projects" class="btn-runx-primary text-sm font-bold">
          العودة لمعرض الأعمال
        </a>
      </div>
    }
  `
})
export class ProjectDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);

  public project = signal<Project | null>(null);
  public isLoading = signal<boolean>(true);
  public activeImageIndex = signal<number>(0);
  public lightboxOpen = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProject(id);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  private loadProject(id: string) {
    this.isLoading.set(true);
    const found = this.projectsService.getProjectById(id);
    if (found) {
      this.project.set(found);
    }
    this.isLoading.set(false);
    this.activeImageIndex.set(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public gallery(): string[] {
    const proj = this.project();
    if (!proj) return [];
    if (proj.galleryImages && proj.galleryImages.length > 0) {
      return proj.galleryImages;
    }
    return [proj.imageUrl];
  }

  public activeImage(): string {
    const gal = this.gallery();
    const idx = this.activeImageIndex();
    return gal[idx] || gal[0] || '';
  }

  public openLightbox(index: number) {
    this.activeImageIndex.set(index);
    this.lightboxOpen.set(true);
  }

  public closeLightbox() {
    this.lightboxOpen.set(false);
  }

  public nextImage() {
    const total = this.gallery().length;
    this.activeImageIndex.update(idx => (idx + 1) % total);
  }

  public prevImage() {
    const total = this.gallery().length;
    this.activeImageIndex.update(idx => (idx - 1 + total) % total);
  }
}
