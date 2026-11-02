import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LanguageService } from './language.service';
import { environment } from '../../Environment/environment';
import { catchError, map, of } from 'rxjs';

export interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  basePriceUsd: number;
  basePriceEgp: number;
  estimatedDays: number;
  icon: string;
}

export interface AddonFeature {
  id: string;
  title: string;
  description: string;
  priceUsd: number;
  priceEgp: number;
  days: number;
  category: 'features' | 'security' | 'integrations' | string;
}

export interface TimelineOption {
  id: string;
  title: string;
  multiplier: number;
  description: string;
}

export type CurrencyType = 'EGP' | 'USD';

@Injectable({
  providedIn: 'root'
})
export class EstimatorService {
  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  public selectedCurrency = signal<CurrencyType>('EGP');

  public projectTypes = signal<ProjectTypeOption[]>([
    {
      id: 'company-website',
      title: 'موقع تعريفي / مؤسسي',
      description: 'موقع متعدد الصفحات يعكس هوية شركتك أو مشروعك مع استمارة تواصل ولوحة تحكم.',
      basePriceUsd: 2000,
      basePriceEgp: 75000,
      estimatedDays: 14,
      icon: 'globe'
    },
    {
      id: 'ecommerce',
      title: 'متجر إلكتروني متكامل',
      description: 'متجر بيع منتجات، سلة تسوق، دفع إلكتروني (مدى/أبل باي)، وإدارة طلبات المخزون.',
      basePriceUsd: 3500,
      basePriceEgp: 140000,
      estimatedDays: 21,
      icon: 'shopping-bag'
    },
    {
      id: 'mobile-app',
      title: 'تطبيق جوال (iOS & Android)',
      description: 'تطبيق ذكي أصيل لآيفون وأندرويد مع خريطة تفاعلية أو إشعارات وتكامل مع السيرفر.',
      basePriceUsd: 4800,
      basePriceEgp: 190000,
      estimatedDays: 30,
      icon: 'smartphone'
    },
    {
      id: 'custom-saas',
      title: 'منصة سحابية مخصصة / ERP',
      description: 'نظام إدارة مؤسسي مخصص للعمليات الداخلي، CRM، أو منصة اشتراكات SaaS.',
      basePriceUsd: 6500,
      basePriceEgp: 260000,
      estimatedDays: 45,
      icon: 'layers'
    }
  ]);

  public availableAddons = signal<AddonFeature[]>([
    {
      id: 'payment-gateway',
      title: 'ربط بوابات الدفع الإلكتروني',
      description: 'دعم الدفع عبر مدى، Visa/Mastercard، Apple Pay، وحسابات سداد.',
      priceUsd: 400,
      priceEgp: 16000,
      days: 3,
      category: 'integrations'
    },
    {
      id: 'admin-dashboard',
      title: 'لوحة تحكم احترافية خيار متقدم',
      description: 'إحصائيات رسومية، إدارة المستخدمين، وتصدير التقارير بأسلوب Excel/PDF.',
      priceUsd: 600,
      priceEgp: 24000,
      days: 5,
      category: 'features'
    },
    {
      id: 'ai-integration',
      title: 'تكامل الذكاء الاصطناعي (AI Assistant)',
      description: 'ربط مساعد ذكي للمحادثة، أتمتة الردود، أو استخراج البيانات التلقائي.',
      priceUsd: 800,
      priceEgp: 32000,
      days: 6,
      category: 'integrations'
    },
    {
      id: 'multi-language',
      title: 'دعم متعدد اللغات (عربي / إنجليزي)',
      description: 'تحويل كامل للواجهة والنصوص بين اللغة العربية والإنجليزية بتبديل فوري.',
      priceUsd: 500,
      priceEgp: 20000,
      days: 4,
      category: 'features'
    },
    {
      id: 'push-notifications',
      title: 'نظام الإشعارات التنبيهية الفورية',
      description: 'إرسال تنبيهات خفية وجوال للمستخدمين مع استهداف المجموعات.',
      priceUsd: 350,
      priceEgp: 14000,
      days: 3,
      category: 'features'
    },
    {
      id: 'high-security',
      title: 'حماية متقدمة وفحص أمني ضد الاختراق',
      description: 'تشفير كامل للبيانات، حماية ضد DDoS، ونسخ احتياطي يومي سحابي.',
      priceUsd: 450,
      priceEgp: 18000,
      days: 2,
      category: 'security'
    }
  ]);

  public timelineOptions = signal<TimelineOption[]>([
    {
      id: 'standard',
      title: 'الجدول الزمني القياسي',
      multiplier: 1.0,
      description: 'تنفيذ احترافي بجودة جبارة وفق الجدول المتفق عليه.'
    },
    {
      id: 'express',
      title: 'تنفيذ سريع عاجل (تفريغ فريق مخصص)',
      multiplier: 1.25,
      description: 'تسريع مدة التسليم بنسبة 35% عبر تعيين فريق مفرغ بالكامل.'
    }
  ]);

  // Selected State Signals
  public selectedTypeId = signal<string>('company-website');
  public selectedAddonIds = signal<string[]>(['payment-gateway', 'admin-dashboard']);
  public selectedTimelineId = signal<string>('standard');
  public isLoadingOptions = signal<boolean>(false);

  constructor() {
    this.detectUserCountryCurrency();
    effect(() => {
      // Re-fetch calculator options whenever language changes
      const lang = this.languageService.currentLang();
      this.fetchOptionsFromApi();
    });
  }

  private detectUserCountryCurrency(): void {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const userLang = navigator.language || '';
      if (timeZone.includes('Cairo') || timeZone.includes('Egypt') || userLang.toLowerCase().includes('ar-eg')) {
        this.selectedCurrency.set('EGP');
      } else {
        this.selectedCurrency.set('USD');
      }
    } catch {
      this.selectedCurrency.set('USD');
    }
  }

  public setCurrency(currency: CurrencyType): void {
    this.selectedCurrency.set(currency);
  }

  public fetchOptionsFromApi(): void {
    this.isLoadingOptions.set(true);
    const currentLang = this.languageService.currentLang();
    const headers = new HttpHeaders({ 'Accept-Language': currentLang });
    this.http.get<any>(`${environment.apiBaseUrl}/calculator/options`, { headers }).pipe(
      map(res => {
        const data = res.data;
        if (data) {
          if (data.projectTypes && data.projectTypes.length > 0) {
            this.projectTypes.set(data.projectTypes);
          }
          if (data.availableAddons && data.availableAddons.length > 0) {
            this.availableAddons.set(data.availableAddons);
          }
          if (data.timelineOptions && data.timelineOptions.length > 0) {
            this.timelineOptions.set(data.timelineOptions);
          }
        }
        this.isLoadingOptions.set(false);
      }),
      catchError(err => {
        this.isLoadingOptions.set(false);
        return of(null);
      })
    ).subscribe();
  }

  // Computed Calculations
  public currentType = computed(() => {
    const list = this.projectTypes();
    return list.find(t => t.id === this.selectedTypeId()) || list[0];
  });

  public selectedAddonsList = computed(() => {
    const ids = this.selectedAddonIds();
    return this.availableAddons().filter(a => ids.includes(a.id));
  });

  public currentTimeline = computed(() => {
    const list = this.timelineOptions();
    return list.find(t => t.id === this.selectedTimelineId()) || list[0];
  });

  public currentBasePrice = computed(() => {
    const type = this.currentType();
    if (!type) return 0;
    return this.selectedCurrency() === 'EGP' ? type.basePriceEgp : type.basePriceUsd;
  });

  public estimatedTotalPrice = computed(() => {
    const isEgp = this.selectedCurrency() === 'EGP';
    const base = this.currentBasePrice();
    const addonsSum = this.selectedAddonsList().reduce((acc, curr) => {
      return acc + (isEgp ? curr.priceEgp : curr.priceUsd);
    }, 0);
    const multiplier = this.currentTimeline()?.multiplier || 1.0;
    return Math.round((base + addonsSum) * multiplier);
  });

  public currencySymbol = computed(() => {
    return this.selectedCurrency() === 'EGP' ? 'ج.م' : '$';
  });

  public estimatedTotalDays = computed(() => {
    const baseDays = this.currentType()?.estimatedDays || 14;
    const addonsDays = this.selectedAddonsList().reduce((acc, curr) => acc + curr.days, 0);
    const isExpress = this.selectedTimelineId() === 'express';
    return isExpress ? Math.round((baseDays + addonsDays) * 0.65) : (baseDays + addonsDays);
  });

  public toggleAddon(addonId: string) {
    const current = this.selectedAddonIds();
    if (current.includes(addonId)) {
      this.selectedAddonIds.set(current.filter(id => id !== addonId));
    } else {
      this.selectedAddonIds.set([...current, addonId]);
    }
  }
}
