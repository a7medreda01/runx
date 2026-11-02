import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-[#0F172A] text-slate-300 border-t border-slate-800 pt-16 pb-12 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          <!-- Brand Column -->
          <div class="lg:col-span-2 space-y-5">
            <a routerLink="/" class="flex items-center gap-3 group inline-flex">
              <div class="w-10 h-10 rounded-xl bg-[#1E2A4A] border border-[#C1662F]/40 p-1.5 flex items-center justify-center shadow-md">
                <img src="/logo.png" alt="runx tech" class="w-full h-full object-contain">
              </div>
              <div class="flex flex-col">
                <span class="font-display text-2xl font-bold text-white tracking-wide">
                  Runx Tech
                </span>
                <span class="text-[10px] text-slate-400 font-mono tracking-wider">
                  SOLUTIONS & TECH
                </span>
              </div>
            </a>

            <p class="subtext-card text-slate-300 max-w-md">
              {{ lang.t()['footer_tagline'] }}
            </p>

            <div class="flex items-center gap-3 pt-2">
              <span class="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-emerald-400 text-xs font-semibold flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>{{ lang.currentLang() === 'ar' ? 'متاحون للمشاريع الجديدة 2026' : 'Available for New Projects 2026' }}</span>
              </span>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="space-y-4">
            <h4 class="text-white font-bold text-base font-display border-[#C1662F]" [class.border-r-3]="lang.dir() === 'rtl'" [class.border-l-3]="lang.dir() === 'ltr'" [class.pr-3]="lang.dir() === 'rtl'" [class.pl-3]="lang.dir() === 'ltr'">
              {{ lang.t()['footer_quick_links'] }}
            </h4>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li>
                <a routerLink="/" class="hover:text-[#C1662F] transition-colors flex items-center gap-2">
                  <span>{{ lang.dir() === 'rtl' ? '‹' : '›' }}</span> {{ lang.t()['nav_home'] }}
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-[#C1662F] transition-colors flex items-center gap-2">
                  <span>{{ lang.dir() === 'rtl' ? '‹' : '›' }}</span> {{ lang.t()['nav_services'] }}
                </a>
              </li>
              <li>
                <a routerLink="/projects" class="hover:text-[#C1662F] transition-colors flex items-center gap-2">
                  <span>{{ lang.dir() === 'rtl' ? '‹' : '›' }}</span> {{ lang.t()['nav_projects'] }}
                </a>
              </li>
              <li>
                <a routerLink="/calculator" class="hover:text-[#C1662F] transition-colors flex items-center gap-2 text-[#C1662F]">
                  <span>{{ lang.dir() === 'rtl' ? '‹' : '›' }}</span> {{ lang.t()['nav_calculator'] }}
                </a>
              </li>
              <li>
                <a routerLink="/contact" class="hover:text-[#C1662F] transition-colors flex items-center gap-2">
                  <span>{{ lang.dir() === 'rtl' ? '‹' : '›' }}</span> {{ lang.t()['nav_contact'] }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Our Services -->
          <div class="space-y-4">
            <h4 class="text-white font-bold text-base font-display border-[#C1662F]" [class.border-r-3]="lang.dir() === 'rtl'" [class.border-l-3]="lang.dir() === 'ltr'" [class.pr-3]="lang.dir() === 'rtl'" [class.pl-3]="lang.dir() === 'ltr'">
              {{ lang.t()['footer_services'] }}
            </h4>
            <ul class="space-y-2.5 text-sm text-slate-400">
              <li>
                <a routerLink="/services" class="hover:text-[#C1662F] transition-colors">
                  {{ lang.currentLang() === 'ar' ? 'تطوير مواقع الشركات' : 'Corporate Web Development' }}
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-[#C1662F] transition-colors">
                  {{ lang.currentLang() === 'ar' ? 'المتاجر الإلكترونية المخصصة' : 'E-Commerce Systems' }}
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-[#C1662F] transition-colors">
                  {{ lang.currentLang() === 'ar' ? 'تطبيقات iOS والأندرويد' : 'Mobile Apps (iOS & Android)' }}
                </a>
              </li>
              <li>
                <a routerLink="/services" class="hover:text-[#C1662F] transition-colors">
                  {{ lang.currentLang() === 'ar' ? 'الأنظمة السحابية SaaS' : 'SaaS & Cloud Platforms' }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4">
            <h4 class="text-white font-bold text-base font-display border-[#C1662F]" [class.border-r-3]="lang.dir() === 'rtl'" [class.border-l-3]="lang.dir() === 'ltr'" [class.pr-3]="lang.dir() === 'rtl'" [class.pl-3]="lang.dir() === 'ltr'">
              {{ lang.t()['footer_contact_us'] }}
            </h4>
            <ul class="space-y-3 text-sm text-slate-300">
              <li class="flex items-start gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#C1662F] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ lang.currentLang() === 'ar' ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Kingdom of Saudi Arabia' }}</span>
              </li>
              <li class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#C1662F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@runxtech.com" class="hover:text-[#C1662F] dir-ltr inline-block">
                  info&#64;runxtech.com
                </a>
              </li>
              <li class="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-[#C1662F] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="https://wa.me/966500000000" target="_blank" class="hover:text-[#C1662F] dir-ltr inline-block">
                  +966 50 000 0000
                </a>
              </li>
            </ul>
          </div>

        </div>

        <!-- Copyright & Legal -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>{{ lang.t()['footer_rights'] }}</p>
          <div class="flex items-center gap-6">
            <span class="hover:text-white transition-colors cursor-pointer">{{ lang.currentLang() === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy' }}</span>
            <span class="hover:text-white transition-colors cursor-pointer">{{ lang.currentLang() === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions' }}</span>
          </div>
        </div>

      </div>
    </footer>
  `
})
export class FooterComponent {
  public lang = inject(LanguageService);
}
