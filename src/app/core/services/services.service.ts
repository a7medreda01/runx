import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceItem } from '../models/project.model';
import { INITIAL_SERVICES } from './data/initial-services.data';
import { ApiService } from './api.service';
import { CurrencyService } from './currency.service';
import { LanguageService } from './language.service';
import { catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServicesService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  private currency = inject(CurrencyService);
  private lang = inject(LanguageService);

  private rawServices = signal<ServiceItem[]>([]);
  public isLoading = signal<boolean>(false);

  /**
   * Computed services list whose prices automatically adapt to the user's detected / selected currency
   */
  public services = computed(() => {
    const list = this.rawServices();
    const currentCurr = this.currency.selectedCurrency();
    const isAr = this.lang.currentLang() === 'ar';

    return list.map(item => {
      let dynamicPrice = item.priceStart;
      const usd = item.priceUsd ?? this.extractNumeric(item.priceStart);
      const egp = item.priceEgp ?? (usd ? Math.round(usd * 50) : undefined);

      if (usd !== undefined && usd > 0) {
        dynamicPrice = this.currency.formatPriceStart(usd, egp);
      }

      return {
        ...item,
        priceStart: dynamicPrice
      };
    });
  });

  constructor() {
    this.fetchServicesFromApi();
  }

  private extractNumeric(str?: string): number | undefined {
    if (!str) return undefined;
    const match = str.replace(/,/g, '').match(/\d+/);
    return match ? parseFloat(match[0]) : undefined;
  }

  public fetchServicesFromApi(): void {
    this.isLoading.set(true);
    this.apiService.getServices().pipe(
      tap(services => {
        if (services && services.length > 0) {
          this.rawServices.set(services);
        } else {
          this.rawServices.set(INITIAL_SERVICES);
        }
        this.isLoading.set(false);
      }),
      catchError(() => {
        this.rawServices.set(INITIAL_SERVICES);
        this.isLoading.set(false);
        return of(INITIAL_SERVICES);
      })
    ).subscribe();
  }
}
