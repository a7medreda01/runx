import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../core/models/project.model';

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (project) {
      <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <!-- Backdrop -->
        <div 
          (click)="closeModal()"
          class="fixed inset-0 bg-[#080C14]/85 backdrop-blur-md transition-opacity animate-fade-in"
        ></div>

        <!-- Dialog Container -->
        <div class="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 text-slate-800">
          
          <!-- Modal Header Banner -->
          <div class="relative h-64 sm:h-80 bg-slate-100 overflow-hidden">
            <img 
              [src]="project.imageUrl" 
              [alt]="project.title"
              class="w-full h-full object-cover"
              referrerpolicy="no-referrer"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

            <!-- Close Button -->
            <button 
              (click)="closeModal()"
              class="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 text-slate-800 hover:text-[#C1662F] flex items-center justify-center border border-slate-200 transition-colors shadow-md font-bold"
              aria-label="إغلاق"
            >
              ✕
            </button>

            <!-- Category Pill -->
            <div class="absolute bottom-6 right-6 flex items-center gap-2">
              <span class="px-3 py-1 rounded-full bg-white/90 text-[#C1662F] text-xs font-bold border border-slate-200 shadow-sm">
                {{ project.categoryLabel }}
              </span>
              @if (project.year) {
                <span class="px-3 py-1 rounded-full bg-[#1E2A4A] text-white text-xs font-bold">
                  {{ project.year }}
                </span>
              }
            </div>
          </div>

          <!-- Body Content -->
          <div class="p-6 sm:p-8 space-y-6">
            
            <div>
              <h2 class="text-2xl sm:text-3xl font-bold font-display text-[#0F172A] mb-2">
                {{ project.title }}
              </h2>
              <p class="text-slate-600 text-sm flex items-center gap-2">
                <span>العميل:</span>
                <strong class="text-[#0F172A] font-bold">{{ project.client }}</strong>
              </p>
            </div>

            <!-- Metrics Bar -->
            @if (project.metrics && project.metrics.length > 0) {
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                @for (m of project.metrics; track m.label) {
                  <div class="text-center">
                    <div class="text-xl sm:text-2xl font-bold font-mono text-[#C1662F]">
                      {{ m.value }}
                    </div>
                    <div class="text-xs text-slate-500 font-medium">
                      {{ m.label }}
                    </div>
                  </div>
                }
              </div>
            }

            <!-- Description -->
            <div class="space-y-2">
              <h3 class="text-base font-bold text-[#0F172A] font-display border-r-3 border-[#C1662F] pr-3">
                تفاصيل المشروع والرؤية
              </h3>
              <p class="text-slate-600 text-sm sm:text-base leading-relaxed">
                {{ project.description }}
              </p>
            </div>

            <!-- Technologies -->
            <div class="space-y-2">
              <h3 class="text-base font-bold text-[#0F172A] font-display border-r-3 border-[#C1662F] pr-3">
                التقنيات المستخدمة
              </h3>
              <div class="flex flex-wrap gap-2">
                @for (tech of project.technologies; track tech) {
                  <span class="px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono font-bold text-[#1E2A4A]">
                    {{ tech }}
                  </span>
                }
              </div>
            </div>

            <!-- Actions Footer -->
            <div class="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              @if (project.liveUrl) {
                <a 
                  [href]="project.liveUrl" 
                  target="_blank" 
                  class="btn-runx-primary w-full sm:w-auto text-center"
                >
                  <span>استعراض المعاينة الحية</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              }
              
              <button 
                (click)="closeModal()"
                class="btn-runx-outline w-full sm:w-auto text-center"
              >
                <span>إغلاق النافذة</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    }
  `
})
export class ProjectModalComponent {
  @Input() project: Project | null = null;
  @Output() close = new EventEmitter<void>();

  public closeModal() {
    this.close.emit();
  }
}
