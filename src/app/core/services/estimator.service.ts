import { Injectable, signal, computed } from '@angular/core';

export interface ProjectTypeOption {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  estimatedDays: number;
  icon: string;
}

export interface AddonFeature {
  id: string;
  title: string;
  description: string;
  price: number;
  days: number;
  category: 'features' | 'security' | 'integrations';
}

export interface TimelineOption {
  id: string;
  title: string;
  multiplier: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EstimatorService {
  public projectTypes: ProjectTypeOption[] = [
    {
      id: 'company-website',
      title: 'موقع تعريفي / مؤسسي',
      description: 'موقع متعدد الصفحات يعكس هوية شركتك أو مشروعك مع استمارة تواصل ولوحة تحكم.',
      basePrice: 2000,
      estimatedDays: 14,
      icon: 'globe'
    },
    {
      id: 'ecommerce',
      title: 'متجر إلكتروني متكامل',
      description: 'متجر بيع منتجات، سلة تسوق، دفع إلكتروني (مدى/أبل باي)، وإدارة طلبات المخزون.',
      basePrice: 3500,
      estimatedDays: 21,
      icon: 'shopping-bag'
    },
    {
      id: 'mobile-app',
      title: 'تطبيق جوال (iOS & Android)',
      description: 'تطبيق ذكي أصيل لآيفون وأندرويد مع خريطة تفاعلية أو إشعارات وتكامل مع السيرفر.',
      basePrice: 4800,
      estimatedDays: 30,
      icon: 'smartphone'
    },
    {
      id: 'custom-saas',
      title: 'منصة سحابية مخصصة / ERP',
      description: 'نظام إدارة مؤسسي مخصص للعمليات الداخلي، CRM، أو منصة اشتراكات SaaS.',
      basePrice: 6500,
      estimatedDays: 45,
      icon: 'layers'
    }
  ];

  public availableAddons: AddonFeature[] = [
    {
      id: 'payment-gateway',
      title: 'ربط بوابات الدفع الإلكتروني',
      description: 'دعم الدفع عبر مدى، Visa/Mastercard، Apple Pay، وحسابات سداد.',
      price: 400,
      days: 3,
      category: 'integrations'
    },
    {
      id: 'admin-dashboard',
      title: 'لوحة تحكم احترافية خيار متقدم',
      description: 'إحصائيات رسومية، إدارة المستخدمين، وتصدير التقارير بأسلوب Excel/PDF.',
      price: 600,
      days: 5,
      category: 'features'
    },
    {
      id: 'ai-integration',
      title: 'تكامل الذكاء الاصطناعي (AI Assistant)',
      description: 'ربط مساعد ذكي للمحادثة، أتمتة الردود، أو استخراج البيانات التلقائي.',
      price: 800,
      days: 6,
      category: 'integrations'
    },
    {
      id: 'multi-language',
      title: 'دعم متعدد اللغات (عربي / إنجليزي)',
      description: 'تحويل كامل للواجهة والنصوص بين اللغة العربية والإنجليزية بتبديل فوري.',
      price: 500,
      days: 4,
      category: 'features'
    },
    {
      id: 'push-notifications',
      title: 'نظام الإشعارات التنبيهية الفورية',
      description: 'إرسال تنبيهات خفية وجوال للمستخدمين مع استهداف المجموعات.',
      price: 350,
      days: 3,
      category: 'features'
    },
    {
      id: 'high-security',
      title: 'حماية متقدمة وفحص أمني ضد الاختراق',
      description: 'تشفير كامل للبيانات، حماية ضد DDoS، ونسخ احتياطي يومي سحابي.',
      price: 450,
      days: 2,
      category: 'security'
    }
  ];

  public timelineOptions: TimelineOption[] = [
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
  ];

  // Selected State Signals
  public selectedTypeId = signal<string>('company-website');
  public selectedAddonIds = signal<string[]>(['payment-gateway', 'admin-dashboard']);
  public selectedTimelineId = signal<string>('standard');

  // Computed Calculations
  public currentType = computed(() => {
    return this.projectTypes.find(t => t.id === this.selectedTypeId()) || this.projectTypes[0];
  });

  public selectedAddonsList = computed(() => {
    const ids = this.selectedAddonIds();
    return this.availableAddons.filter(a => ids.includes(a.id));
  });

  public currentTimeline = computed(() => {
    return this.timelineOptions.find(t => t.id === this.selectedTimelineId()) || this.timelineOptions[0];
  });

  public estimatedTotalPrice = computed(() => {
    const base = this.currentType().basePrice;
    const addonsSum = this.selectedAddonsList().reduce((acc, curr) => acc + curr.price, 0);
    const multiplier = this.currentTimeline().multiplier;
    return Math.round((base + addonsSum) * multiplier);
  });

  public estimatedTotalDays = computed(() => {
    const baseDays = this.currentType().estimatedDays;
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
