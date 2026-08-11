import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 space-y-10">
      
      <!-- Page Header -->
      <div class="text-center space-y-3 max-w-3xl mx-auto">
        <span class="runx-glass-pill text-xs">معرض الأعمال المنجزة</span>
        <h1 class="text-4xl sm:text-5xl font-bold font-display text-[#0F172A]">
          مشاريع أثبتت جدارتها في السوق
        </h1>
        <p class="subtext-lead text-slate-700">
          استكشف مجموعة من المشاريع والمنصات التي قامت <strong class="text-[#0F172A]">runx tech</strong> بتصميمها وتطويرها بمواصفات عالمية.
        </p>
      </div>

      <!-- Filters & Search Bar -->
      <div class="runx-card p-4 sm:p-6 space-y-4 sm:space-y-6">
        
        <!-- Search Input -->
        <div class="relative max-w-md mx-auto">
          <input 
            type="text"
            [value]="projectsService.searchQuery()"
            (input)="onSearchInput($event)"
            placeholder="ابحث بالاسم، العميل، أو التقنية (مثل: Angular, Flutter)..."
            class="runx-input pr-10 text-xs sm:text-sm"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 absolute top-3.5 right-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Category Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center scrollbar-none w-full">
          @for (cat of categories; track cat.id) {
            <button 
              (click)="setCategory(cat.id)"
              [class]="projectsService.selectedCategory() === cat.id ? 
                'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer bg-[#1E2A4A] border-[#1E2A4A] text-white shadow-xs shrink-0 whitespace-nowrap' : 
                'px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all border cursor-pointer bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 shrink-0 whitespace-nowrap'"
            >
              {{ cat.label }}
            </button>
          }
        </div>

      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        @for (project of projectsService.filteredProjects(); track project.id) {
          <a 
            [routerLink]="['/projects', project.id]"
            class="runx-card overflow-hidden group cursor-pointer flex flex-col justify-between hover:border-[#C1662F]/40 transition-all duration-300 rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs"
          >
            <div>
              <div class="relative h-48 sm:h-56 bg-slate-100 overflow-hidden">
                <img 
                  [src]="project.imageUrl" 
                  [alt]="project.title" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerpolicy="no-referrer"
                >
                <span class="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 text-[#C1662F] text-xs font-bold border border-slate-200 shadow-xs">
                  {{ project.categoryLabel }}
                </span>
              </div>

              <div class="p-5 sm:p-6 space-y-3">
                <h3 class="text-lg sm:text-xl font-bold font-display text-[#0F172A] group-hover:text-[#C1662F] transition-colors leading-snug">
                  {{ project.title }}
                </h3>
                <p class="subtext-card text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                  {{ project.summary }}
                </p>

                <div class="flex flex-wrap gap-1.5 pt-1">
                  @for (tech of project.technologies; track tech) {
                    <span class="runx-tag text-[11px] sm:text-xs">
                      {{ tech }}
                    </span>
                  }
                </div>
              </div>
            </div>

            <div class="p-4 sm:p-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
              <span>العميل: {{ project.client }}</span>
              <span class="text-[#C1662F] font-bold flex items-center gap-1.5">
                <span>التفاصيل</span>
                <i class="bi bi-arrow-left"></i>
              </span>
            </div>

          </a>
        } @empty {
          <div class="col-span-full py-16 text-center runx-card space-y-3">
            <div class="text-4xl">🔍</div>
            <h3 class="text-xl font-bold text-[#0F172A] font-display">لم يتم العثور على مشاريع مطابقة</h3>
            <p class="text-sm text-slate-500">جرب تغيير عبارة البحث أو اختيار تصنيف آخر.</p>
          </div>
        }
      </div>

      <!-- Consultation Banner -->
      <section class="pt-8">
        <div class="relative overflow-hidden rounded-3xl p-8 sm:p-12 border border-[#C1662F]/30 bg-gradient-to-br from-[#1E2A4A] via-[#16213A] to-[#0F172A] text-white shadow-2xl">
          <div class="absolute -top-24 -left-24 w-60 h-60 bg-[#C1662F]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            <div class="lg:col-span-2 space-y-4">
              <span class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-xs font-bold text-[#E28A4A] border border-white/10">
                <i class="bi bi-patch-check-fill text-[#C1662F]"></i>
                <span>استشارة تقنية مجانية</span>
              </span>
              <h2 class="text-2xl sm:text-4xl font-bold font-display text-white leading-tight">
                لديك فكرة مشروع مشابه وتريد تنفيذه بنفس المستوى الفاخر؟
              </h2>
              <p class="subtext-section text-slate-200 max-w-2xl">
                تواصل مع فريق مهندسي <strong class="text-white font-extrabold">runx tech</strong> لدراسة فكرتك وتحويلها إلى منتج رقمي ناجح ينافس في السوق.
              </p>
            </div>

            <div class="flex justify-start lg:justify-end">
              <a routerLink="/contact" class="btn-runx-primary text-sm sm:text-base px-8 py-4 font-bold whitespace-nowrap flex items-center gap-3 shadow-xl shadow-[#C1662F]/25 hover:shadow-[#C1662F]/40 transition-all">
                <span>احجز استشارة مجانية</span>
                <i class="bi bi-arrow-left text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  `
})
export class ProjectsPage {
  public projectsService = inject(ProjectsService);

  public categories = [
    { id: 'all', label: 'الكل' },
    { id: 'saas', label: 'منصات سحابية SaaS' },
    { id: 'ecommerce', label: 'تجارة إلكترونية' },
    { id: 'mobile', label: 'تطبيقات جوال' },
    { id: 'web', label: 'مواقع شركات' },
    { id: 'custom', label: 'أنظمة مخصصة ERP' }
  ];

  public setCategory(cat: string) {
    this.projectsService.selectedCategory.set(cat);
  }

  public onSearchInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.projectsService.searchQuery.set(val);
  }
}
