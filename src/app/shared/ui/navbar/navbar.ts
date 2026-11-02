import { Component, signal, HostListener, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LanguageService } from '../../../core/services/language.service';
import { CurrencyService } from '../../../core/services/currency.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.bg-white/95]="isScrolled()"
      [class.backdrop-blur-md]="isScrolled()"
      [class.shadow-sm]="isScrolled()"
      [class.border-b]="isScrolled()"
      [class.border-slate-200]="isScrolled()"
      [class.py-3]="isScrolled()"
      [class.py-4]="!isScrolled()"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          
          <!-- Logo & Brand Name -->
          <a routerLink="/" class="flex items-center gap-3 group">
            <div class="relative w-10 h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src="/logo.png" alt="runx tech" class="w-full h-full object-contain" referrerpolicy="no-referrer">
            </div>
            <div class="flex flex-col">
              <span class="font-display text-xl font-bold text-[#0F172A] tracking-wide group-hover:text-[#C1662F] transition-colors">
                Runx Tech
              </span>
              <span class="text-[10px] text-[#64748B] font-mono tracking-wider -mt-1 font-semibold">
                SOLUTIONS & TECH
              </span>
            </div>
          </a>

          <!-- Desktop Nav Links -->
          <nav class="hidden md:flex items-center gap-1 bg-slate-100/90 border border-slate-200/80 rounded-full px-3 py-1.5">
            <a 
              routerLink="/" 
              routerLinkActive="bg-[#1E2A4A] text-white font-semibold shadow-sm" 
              [routerLinkActiveOptions]="{exact: true}"
              class="px-4 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-[#0F172A] transition-all hover:bg-slate-200/60"
            >
              {{ lang.t()['nav_home'] }}
            </a>
            <a 
              routerLink="/services" 
              routerLinkActive="bg-[#1E2A4A] text-white font-semibold shadow-sm" 
              class="px-4 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-[#0F172A] transition-all hover:bg-slate-200/60"
            >
              {{ lang.t()['nav_services'] }}
            </a>
            <a 
              routerLink="/projects" 
              routerLinkActive="bg-[#1E2A4A] text-white font-semibold shadow-sm" 
              class="px-4 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-[#0F172A] transition-all hover:bg-slate-200/60"
            >
              {{ lang.t()['nav_projects'] }}
            </a>
            <a 
              routerLink="/calculator" 
              routerLinkActive="bg-[#FDF6F0] text-[#C1662F] font-semibold border border-[#C1662F]/30" 
              class="px-4 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-[#0F172A] transition-all hover:bg-slate-200/60 flex items-center gap-1.5"
            >
              <span class="w-2 h-2 rounded-full bg-[#C1662F] animate-pulse"></span>
              {{ lang.t()['nav_calculator'] }}
            </a>
            <a 
              routerLink="/contact" 
              routerLinkActive="bg-[#1E2A4A] text-white font-semibold shadow-sm" 
              class="px-4 py-1.5 rounded-full text-sm font-medium text-slate-700 hover:text-[#0F172A] transition-all hover:bg-slate-200/60"
            >
              {{ lang.t()['nav_contact'] }}
            </a>
          </nav>

          <!-- Action Button & Switchers -->
          <div class="hidden md:flex items-center gap-3">
            
            <!-- Currency Switcher Pill Button -->
            <div class="inline-flex items-center bg-slate-100 hover:bg-slate-200/80 border border-slate-300 rounded-full p-0.5 text-xs font-bold transition-all shadow-xs">
              <button 
                (click)="currency.setCurrency('EGP')" 
                type="button"
                class="px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                [class.bg-[#1E2A4A]]="currency.selectedCurrency() === 'EGP'"
                [class.text-white]="currency.selectedCurrency() === 'EGP'"
                [class.shadow-xs]="currency.selectedCurrency() === 'EGP'"
                [class.text-slate-600]="currency.selectedCurrency() !== 'EGP'"
                title="السعر بالجنيه المصري (EGP)"
              >
                <span>🇪🇬</span>
                <span>{{ lang.currentLang() === 'ar' ? 'ج.م' : 'EGP' }}</span>
              </button>
              <button 
                (click)="currency.setCurrency('USD')" 
                type="button"
                class="px-2.5 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                [class.bg-[#1E2A4A]]="currency.selectedCurrency() === 'USD'"
                [class.text-white]="currency.selectedCurrency() === 'USD'"
                [class.shadow-xs]="currency.selectedCurrency() === 'USD'"
                [class.text-slate-600]="currency.selectedCurrency() !== 'USD'"
                title="Global USD Price ($)"
              >
                <span>🌐</span>
                <span>$</span>
              </button>
            </div>

            <!-- Language Toggle Pill Button -->
            <button 
              (click)="lang.toggleLanguage()" 
              type="button"
              class="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              [title]="'Switch language / تغيير اللغة'"
            >
              <span>{{ lang.t()['lang_flag'] }}</span>
              <span>{{ lang.t()['lang_btn_label'] }}</span>
            </button>

            <button 
              (click)="onRequestConsultation()"
              class="btn-runx-primary text-sm font-semibold whitespace-nowrap"
            >
              <span>{{ lang.t()['nav_consultation'] }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" [class.rotate-180]="lang.dir() === 'rtl'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>

          <!-- Mobile Right Controls (Currency + Lang + Hamburger) -->
          <div class="flex md:hidden items-center gap-1.5">
            <button 
              (click)="currency.toggleCurrency()" 
              type="button"
              class="px-2 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
              [title]="'تبديل العملة: ' + currency.currencyLabel()"
            >
              <span>{{ currency.selectedCurrency() === 'EGP' ? '🇪🇬' : '🌐' }}</span>
              <span>{{ currency.currencySymbol() }}</span>
            </button>

            <button 
              (click)="lang.toggleLanguage()" 
              type="button"
              class="px-2 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <span>{{ lang.t()['lang_flag'] }}</span>
              <span>{{ lang.t()['lang_btn_label'] }}</span>
            </button>

            <button 
              (click)="toggleMobileMenu()"
              class="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 hover:text-[#C1662F]"
              aria-label="Menu"
            >
              @if (!mobileMenuOpen()) {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              }
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Dropdown Navigation -->
      @if (mobileMenuOpen()) {
        <div class="md:hidden bg-white border-b border-slate-200 px-6 py-6 mt-2 shadow-xl animate-fade-in">
          <div class="flex flex-col gap-2">
            <a 
              routerLink="/" 
              (click)="closeMobileMenu()"
              class="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {{ lang.t()['nav_home'] }}
            </a>
            <a 
              routerLink="/services" 
              (click)="closeMobileMenu()"
              class="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {{ lang.t()['nav_services'] }}
            </a>
            <a 
              routerLink="/projects" 
              (click)="closeMobileMenu()"
              class="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {{ lang.t()['nav_projects'] }}
            </a>
            <a 
              routerLink="/calculator" 
              (click)="closeMobileMenu()"
              class="px-4 py-2.5 rounded-xl text-base font-semibold text-[#C1662F] bg-[#FDF6F0] border border-[#C1662F]/20"
            >
              {{ lang.t()['nav_calculator'] }}
            </a>
            <a 
              routerLink="/contact" 
              (click)="closeMobileMenu()"
              class="px-4 py-2.5 rounded-xl text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              {{ lang.t()['nav_contact'] }}
            </a>

            <!-- Mobile Currency Switcher Section -->
            <div class="pt-3 border-t border-slate-100 flex items-center justify-between px-2">
              <span class="text-xs font-bold text-slate-600">{{ lang.currentLang() === 'ar' ? 'عملة الأسعار:' : 'Currency:' }}</span>
              <div class="inline-flex items-center bg-slate-100 border border-slate-200 rounded-full p-0.5 text-xs font-bold">
                <button 
                  (click)="currency.setCurrency('EGP')" 
                  type="button"
                  class="px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                  [class.bg-[#1E2A4A]]="currency.selectedCurrency() === 'EGP'"
                  [class.text-white]="currency.selectedCurrency() === 'EGP'"
                  [class.text-slate-700]="currency.selectedCurrency() !== 'EGP'"
                >
                  <span>🇪🇬</span>
                  <span>{{ lang.currentLang() === 'ar' ? 'ج.م' : 'EGP' }}</span>
                </button>
                <button 
                  (click)="currency.setCurrency('USD')" 
                  type="button"
                  class="px-3 py-1 rounded-full transition-all flex items-center gap-1 cursor-pointer"
                  [class.bg-[#1E2A4A]]="currency.selectedCurrency() === 'USD'"
                  [class.text-white]="currency.selectedCurrency() === 'USD'"
                  [class.text-slate-700]="currency.selectedCurrency() !== 'USD'"
                >
                  <span>🌐</span>
                  <span>USD ($)</span>
                </button>
              </div>
            </div>

            <div class="pt-4 border-t border-slate-200 mt-2 space-y-3">
              <button 
                (click)="onRequestConsultation(); closeMobileMenu()"
                class="w-full btn-runx-primary text-center justify-center py-3"
              >
                <span>{{ lang.t()['nav_consultation'] }}</span>
              </button>
            </div>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  public lang = inject(LanguageService);
  public currency = inject(CurrencyService);
  @Output() openConsultation = new EventEmitter<void>();

  public isScrolled = signal<boolean>(false);
  public mobileMenuOpen = signal<boolean>(false);

  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  public toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  public closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }

  public onRequestConsultation() {
    this.openConsultation.emit();
  }
}
