import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';
import { catchError, of, timeout } from 'rxjs';

export type CurrencyType = 'EGP' | 'USD';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private http = inject(HttpClient);
  private lang = inject(LanguageService);

  private readonly STORAGE_KEY = 'runx_currency';
  public selectedCurrency = signal<CurrencyType>('USD');

  public currencySymbol = computed(() => {
    const isAr = this.lang.currentLang() === 'ar';
    return this.selectedCurrency() === 'EGP' ? (isAr ? 'ج.م' : 'EGP') : '$';
  });

  public currencyLabel = computed(() => {
    const isAr = this.lang.currentLang() === 'ar';
    if (this.selectedCurrency() === 'EGP') {
      return isAr ? 'السعر المصري (ج.م)' : 'Egyptian Pound (EGP)';
    }
    return isAr ? 'السعر العالمي ($)' : 'Global USD ($)';
  });

  public isEgp = computed(() => this.selectedCurrency() === 'EGP');

  constructor() {
    this.initCurrencyDetection();
  }

  private initCurrencyDetection(): void {
    // 1. Check if user already manually selected a currency in localStorage
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved === 'EGP' || saved === 'USD') {
        this.selectedCurrency.set(saved);
        return;
      }
    } catch {}

    // 2. Immediate synchronous heuristic detection (Timezone & Locale)
    let detectedFromBrowser: CurrencyType = 'USD';
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const userLang = (navigator.language || '').toLowerCase();
      const allLangs = (navigator.languages || []).map(l => l.toLowerCase()).join(',');

      if (
        timeZone.includes('Cairo') || 
        timeZone.includes('Egypt') || 
        timeZone.includes('Africa/Cairo') ||
        userLang.includes('ar-eg') ||
        userLang.endsWith('-eg') ||
        allLangs.includes('ar-eg')
      ) {
        detectedFromBrowser = 'EGP';
      }
    } catch {}

    this.selectedCurrency.set(detectedFromBrowser);

    // 3. Asynchronous GeoIP lookup for high-accuracy country verification
    this.detectFromGeoIp();
  }

  private detectFromGeoIp(): void {
    // Free, reliable GeoIP lookup with CORS enabled
    this.http.get<{ country_code?: string; countryCode?: string; country?: string }>('https://ipwho.is/')
      .pipe(
        timeout(3500),
        catchError(() => {
          // Fallback to secondary GeoIP provider if ipwho.is is blocked
          return this.http.get<{ country?: string }>('https://api.country.is/').pipe(
            timeout(2500),
            catchError(() => of(null))
          );
        })
      )
      .subscribe(res => {
        // If user already manually picked a currency while loading, do not override
        try {
          if (localStorage.getItem(this.STORAGE_KEY)) return;
        } catch {}

        if (res) {
          const r = res as any;
          const code = (r.country_code || r.countryCode || r.country || '').toUpperCase();
          if (code === 'EG' || code === 'EGYPT') {
            this.selectedCurrency.set('EGP');
          } else if (code) {
            this.selectedCurrency.set('USD');
          }
        }
      });
  }

  public setCurrency(currency: CurrencyType): void {
    this.selectedCurrency.set(currency);
    try {
      localStorage.setItem(this.STORAGE_KEY, currency);
    } catch {}
  }

  public toggleCurrency(): void {
    const next = this.selectedCurrency() === 'EGP' ? 'USD' : 'EGP';
    this.setCurrency(next);
  }

  /**
   * Format prices according to the selected currency.
   * Standard conversion rate: 1 USD = 50 EGP if custom EGP amount is not explicitly provided.
   */
  public formatPrice(usdAmount: number, egpAmount?: number): string {
    const isAr = this.lang.currentLang() === 'ar';
    if (this.selectedCurrency() === 'EGP') {
      const amount = egpAmount !== undefined ? egpAmount : Math.round(usdAmount * 50);
      const formatted = new Intl.NumberFormat('en-US').format(amount);
      return isAr ? `${formatted} ج.م` : `${formatted} EGP`;
    } else {
      const formatted = new Intl.NumberFormat('en-US').format(usdAmount);
      return isAr ? `${formatted} $` : `$${formatted}`;
    }
  }

  /**
   * Format 'Starts at' price strings
   */
  public formatPriceStart(usdAmount: number, egpAmount?: number): string {
    const isAr = this.lang.currentLang() === 'ar';
    const priceFormatted = this.formatPrice(usdAmount, egpAmount);
    return isAr ? `يبدأ من ${priceFormatted}` : `Starts at ${priceFormatted}`;
  }
}
