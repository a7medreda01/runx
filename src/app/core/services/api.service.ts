import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { LanguageService } from './language.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../Environment/environment';
import { Project, ServiceItem } from '../models/project.model';
import { INITIAL_SERVICES } from './data/initial-services.data';
import { ApiResponse, PagedData, Company } from '../../Models/api.models';

export interface CompanyInfo {
  companyName: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  workingHours: string;
  stats: {
    completedProjects: number;
    satisfiedClients: number;
    yearsOfExperience: number;
    uptimeGuarantee: string;
  };
  apiMeta: {
    version: string;
    status: string;
    environment: string;
    serverRegion: string;
  };
}

export interface ApiResponseMeta {
  endpoint: string;
  statusCode: number;
  statusText: string;
  timestamp: string;
  responseTimeMs: number;
  data: any;
}

export interface ContactSubmitRequest {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface ContactSubmitResponse {
  success: boolean;
  referenceId: string;
  receivedAt: string;
  status: string;
  message: string;
  assignedEngineer: string;
  submittedData: ContactSubmitRequest;
}

export interface EstimateSubmitRequest {
  projectType: string;
  addons: string[];
  timeline: string;
  estimatedPrice: number;
  estimatedDays: number;
  clientName?: string;
  clientContact?: string;
}

export interface EstimateSubmitResponse {
  success: boolean;
  estimateReference: string;
  generatedAt: string;
  validUntil: string;
  priceUSD: number;
  timelineDays: number;
  status: string;
  summary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private languageService = inject(LanguageService);

  public lastApiResponse = signal<ApiResponseMeta | null>(null);
  public isApiLoading = signal<boolean>(false);
  public apiError = signal<string | null>(null);

  public companyInfo = signal<CompanyInfo | null>(null);

  constructor() {
    this.loadCompanyInfo();
  }

  private normalizeUrl(url: string | null): string {
    if (!url) return '';
    const baseHost = environment.apiBaseUrl.replace('/api', '');
    if (url.startsWith('https://localhost:7233') || url.startsWith('http://localhost:5244')) {
      return url.replace(/https?:\/\/localhost:\d+/, baseHost);
    }
    if (url.startsWith('/')) {
      return `${baseHost}${url}`;
    }
    return url;
  }

  public loadCompanyInfo(): Observable<CompanyInfo | null> {
    const startTime = performance.now();
    return this.http.get<ApiResponse<Company[]>>(`${environment.apiBaseUrl}/Company`, { observe: 'response' }).pipe(
      map(res => {
        const endTime = performance.now();
        const apiData = res.body?.data;
        let info: CompanyInfo | null = null;
        if (apiData && apiData.length > 0) {
          const comp = apiData[0];
          info = {
            companyName: comp.name || 'RunX Tech',
            tagline: comp.vision || 'حلول رقمية برمجية متكاملة',
            location: comp.contactInfo?.address || 'الرياض، المملكة العربية السعودية',
            email: comp.contactInfo?.email || 'info@runxtech.com',
            phone: comp.contactInfo?.phone || '+966500000000',
            workingHours: 'الأحد - الخميس (9:00 ص - 6:00 م)',
            stats: {
              completedProjects: (comp as any).completedProjects || 100,
              satisfiedClients: (comp as any).satisfiedClients || 99,
              yearsOfExperience: comp.yearsOfExperience || 12,
              uptimeGuarantee: (comp as any).uptimeGuarantee || '99.9%'
            },
            apiMeta: {
              version: 'v1.0.0',
              status: '200 OK (LIVE_BACKEND)',
              environment: 'Development',
              serverRegion: 'ASP.NET Core Server'
            }
          };
          this.companyInfo.set(info);
        }
        this.lastApiResponse.set({
          endpoint: `${environment.apiBaseUrl}/Company`,
          statusCode: res.status || 200,
          statusText: res.statusText || 'OK',
          timestamp: new Date().toISOString(),
          responseTimeMs: Math.round(endTime - startTime),
          data: apiData
        });
        return info;
      }),
      catchError(err => {
        this.apiError.set('تعذر تحميل بيانات الشركة من خادم API');
        return of(null);
      })
    );
  }

  private mapProjectDtoToProject(p: any): Project {
    const lang = this.languageService.currentLang();
    const title = lang === 'en' ? (p.nameEn || p.name) : (p.nameAr || p.name);
    const description = lang === 'en' ? (p.descriptionEn || p.description) : (p.descriptionAr || p.description);
    const client = lang === 'en' ? (p.clientEn || p.client) : (p.clientAr || p.client);
    const duration = lang === 'en' ? (p.durationEn || p.duration) : (p.durationAr || p.duration);
    const role = lang === 'en' ? (p.roleEn || p.role) : (p.roleAr || p.role);
    const categoryName = lang === 'en' ? (p.categoryNameEn || p.categoryName || p.categoryLabel) : (p.categoryNameAr || p.categoryName || p.categoryLabel);
    const keyFeaturesJson = lang === 'en' ? (p.keyFeaturesJsonEn || p.keyFeaturesJson) : (p.keyFeaturesJsonAr || p.keyFeaturesJson);
    let technologies: string[] = ['ASP.NET Core', 'Angular', 'SQL Server'];
    if (p.technologiesJson) {
      try { technologies = JSON.parse(p.technologiesJson); } catch {}
    }

    let keyFeatures: string[] = [];
    if (keyFeaturesJson) {
      try { keyFeatures = JSON.parse(p.keyFeaturesJson); } catch {}
    }

    let metrics: any[] = [];
    if (p.metricsJson) {
      try { metrics = JSON.parse(p.metricsJson); } catch {}
    }

    let challengeSolution: any[] = [];
    if (p.challengeSolutionsJson) {
      try { challengeSolution = JSON.parse(p.challengeSolutionsJson); } catch {}
    }

    const categoryMap: { [key: string]: 'custom' | 'web' | 'mobile' | 'saas' | 'ecommerce' } = {
      'منصات سحابية SaaS': 'saas',
      'تجارة إلكترونية': 'ecommerce',
      'تطبيقات جوال': 'mobile',
      'مواقع شركات': 'web',
      'أنظمة مخصصة': 'custom'
    };

    const catName = p.categoryName || '';
    const categoryKey = categoryMap[catName] || 'custom';

    const rawCover = p.coverImage || (p.images && p.images.length > 0 ? p.images[0].imageUrl : '');
    const coverUrl = this.normalizeUrl(rawCover) || '/assets/images/saas_dashboard_preview_1786458589392.jpg';

    const galleryImages: string[] = p.images ? p.images.map((i: any) => this.normalizeUrl(i.imageUrl)) : [coverUrl];

    return {
      id: p.id ? p.id.toString() : 'proj-' + Math.random(),
      title: title,
      category: categoryKey,
      categoryLabel: categoryName || (lang === 'en' ? 'General' : 'عام'),
      summary: description || '',
      description: description || '',
      imageUrl: coverUrl,
      galleryImages: galleryImages.length > 0 ? galleryImages : [coverUrl],
      client: client || (lang === 'en' ? 'Valued Client' : 'عميل مميز'),
      duration: duration || (lang === 'en' ? 'Custom' : 'مخصص'),
      role: role || (lang === 'en' ? 'Full-Stack Development' : 'تطوير وتنفيذ متكامل'),
      liveUrl: p.liveUrl || '',
      technologies: technologies,
      featured: p.featured ?? true,
      year: new Date(p.executionDate || Date.now()).getFullYear().toString(),
      executionDate: p.executionDate || undefined,
      keyFeatures: keyFeatures,
      metrics: metrics,
      challengeSolution: challengeSolution
    };
  }

  public getProjects(): Observable<Project[]> {
    this.isApiLoading.set(true);
    const startTime = performance.now();

    const currentLang = this.languageService.currentLang();
    const headers = new HttpHeaders({ 'Accept-Language': currentLang });
    return this.http.get<ApiResponse<PagedData<any>>>(`${environment.apiBaseUrl}/projects`, { headers, observe: 'response' }).pipe(
      map(res => {
        const endTime = performance.now();
        this.isApiLoading.set(false);
        const paged = res.body?.data;
        const items = paged?.items || [];
        
        const mappedProjects: Project[] = items.map((p: any) => this.mapProjectDtoToProject(p));

        this.lastApiResponse.set({
          endpoint: `${environment.apiBaseUrl}/projects`,
          statusCode: res.status || 200,
          statusText: res.statusText || 'OK',
          timestamp: new Date().toISOString(),
          responseTimeMs: Math.round(endTime - startTime),
          data: { totalProjects: mappedProjects.length, items: mappedProjects }
        });

        return mappedProjects;
      }),
      catchError(err => {
        this.isApiLoading.set(false);
        this.apiError.set('فشل الاتصال بـ API المشاريع');
        return throwError(() => err);
      })
    );
  }

  public getProjectById(id: string): Observable<Project | null> {
    return this.http.get<ApiResponse<any>>(`${environment.apiBaseUrl}/projects/${id}`).pipe(
      map(res => {
        const p = res.data;
        if (!p) return null;
        return this.mapProjectDtoToProject(p);
      }),
      catchError(() => of(null))
    );
  }

  public getServices(): Observable<ServiceItem[]> {
    this.isApiLoading.set(true);
    const startTime = performance.now();

    return this.http.get<ApiResponse<PagedData<any>>>(`${environment.apiBaseUrl}/services`, { observe: 'response' }).pipe(
      map(res => {
        const endTime = performance.now();
        this.isApiLoading.set(false);
        const paged = res.body?.data;
        const items = paged?.items || [];

        let mappedServices: ServiceItem[] = (items && items.length > 0) ? items.map((s: any, idx: number) => {
          const fallback = INITIAL_SERVICES[idx % INITIAL_SERVICES.length];
          const title = (s.name && s.name.trim().length > 0) ? s.name : (fallback?.title || 'خدمة برمجية');
          const description = (s.description && s.description.trim().length > 0) ? s.description : (fallback?.description || '');
          const subtitle = (s.subtitle && s.subtitle.trim().length > 0) ? s.subtitle : (s.categoryName || fallback?.subtitle || 'خدمات رقمية متقدمة');

          let features: string[] = [];
          if (s.featuresJson) {
            try {
              const parsed = JSON.parse(s.featuresJson);
              if (Array.isArray(parsed) && parsed.length > 0) features = parsed;
            } catch {}
          }
          if (features.length === 0 && fallback?.features) {
            features = fallback.features;
          }

          let technologies: string[] = [];
          if (s.technologiesJson) {
            try {
              const parsed = JSON.parse(s.technologiesJson);
              if (Array.isArray(parsed) && parsed.length > 0) technologies = parsed;
            } catch {}
          }
          if (technologies.length === 0 && fallback?.technologies) {
            technologies = fallback.technologies;
          }

          const rawImg = s.imageUrl || fallback?.imageUrl;
          const imgUrl = this.normalizeUrl(rawImg);

          let priceUsd: number | undefined = fallback?.priceUsd;
          let priceEgp: number | undefined = fallback?.priceEgp;
          if (s.priceStart !== null && s.priceStart !== undefined && s.priceStart !== '') {
            const parsed = parseFloat(s.priceStart.toString().replace(/[^0-9.]/g, ''));
            if (!isNaN(parsed) && parsed > 0) {
              priceUsd = parsed;
              priceEgp = Math.round(parsed * 50);
            }
          }

          return {
            id: s.id ? s.id.toString() : (fallback?.id || 'srv-' + (idx + 1)),
            title: title,
            subtitle: subtitle,
            icon: fallback?.icon || 'code',
            bootstrapIcon: s.bootstrapIcon || fallback?.bootstrapIcon || 'bi-code-slash',
            imageUrl: imgUrl || undefined,
            description: description,
            features: features,
            technologies: technologies,
            priceStart: (priceUsd ? 'يبدأ من ' + priceUsd + ' $' : (fallback?.priceStart || 'حسب النطاق')),
            priceUsd: priceUsd,
            priceEgp: priceEgp
          };
        }) : [...INITIAL_SERVICES];

        // If backend returned services with no valid titles or fewer items, supplement with INITIAL_SERVICES
        if (mappedServices.length < INITIAL_SERVICES.length) {
          const existingTitles = mappedServices.map(m => (m.title || '').toLowerCase());
          for (const initSrv of INITIAL_SERVICES) {
            if (!existingTitles.includes((initSrv.title || '').toLowerCase())) {
              mappedServices.push(initSrv);
            }
          }
        }

        this.lastApiResponse.set({
          endpoint: `${environment.apiBaseUrl}/services`,
          statusCode: res.status || 200,
          statusText: res.statusText || 'OK',
          timestamp: new Date().toISOString(),
          responseTimeMs: Math.round(endTime - startTime),
          data: { totalServices: mappedServices.length }
        });

        return mappedServices;
      }),
      catchError(err => {
        this.isApiLoading.set(false);
        this.apiError.set('فشل الاتصال بـ API الخدمات');
        return throwError(() => err);
      })
    );
  }

  public submitContact(reqData: ContactSubmitRequest): Observable<ContactSubmitResponse> {
    this.isApiLoading.set(true);
    const startTime = performance.now();

    return this.http.post<ApiResponse<any>>(`${environment.apiBaseUrl}/contact/submit`, reqData, { observe: 'response' }).pipe(
      map(res => {
        const endTime = performance.now();
        this.isApiLoading.set(false);
        const backendResp = res.body?.data || {};

        const responseObj: ContactSubmitResponse = {
          success: true,
          referenceId: backendResp.referenceId || ('RUNX-REQ-' + Math.floor(100000 + Math.random() * 900000)),
          receivedAt: backendResp.receivedAt || new Date().toLocaleString('ar-SA'),
          status: '200 OK (SAVED_IN_DATABASE)',
          message: backendResp.message || 'تم حفظ وتأكيد طلب التواصل بنجاح لدى خوادم runx tech.',
          assignedEngineer: 'قسم الدعم الفني والحلول السحابية',
          submittedData: reqData
        };

        this.lastApiResponse.set({
          endpoint: `${environment.apiBaseUrl}/contact/submit`,
          statusCode: res.status || 200,
          statusText: res.statusText || 'OK',
          timestamp: new Date().toISOString(),
          responseTimeMs: Math.round(endTime - startTime),
          data: responseObj
        });

        return responseObj;
      }),
      catchError(err => {
        this.isApiLoading.set(false);
        this.apiError.set('حدث خطأ أثناء إرسال طلب التواصل');
        return throwError(() => err);
      })
    );
  }

  public submitEstimate(reqData: EstimateSubmitRequest): Observable<EstimateSubmitResponse> {
    this.isApiLoading.set(true);
    const startTime = performance.now();

    return this.http.post<ApiResponse<any>>(`${environment.apiBaseUrl}/estimates/calculate`, reqData, { observe: 'response' }).pipe(
      map(res => {
        const endTime = performance.now();
        this.isApiLoading.set(false);
        const backendResp = res.body?.data || {};

        const responseObj: EstimateSubmitResponse = {
          success: true,
          estimateReference: backendResp.estimateReference || ('RUNX-EST-' + Math.floor(100000 + Math.random() * 900000)),
          generatedAt: backendResp.generatedAt || new Date().toLocaleString('ar-SA'),
          validUntil: backendResp.validUntil || new Date(Date.now() + 30 * 86400000).toLocaleDateString('ar-SA'),
          priceUSD: reqData.estimatedPrice,
          timelineDays: reqData.estimatedDays,
          status: 'CONFIRMED_LIVE_QUOTE',
          summary: backendResp.summary || `تقدير أولي بقيمة ${reqData.estimatedPrice} $ ومدة تسليم متوقعة ${reqData.estimatedDays} يوم عمل.`
        };

        this.lastApiResponse.set({
          endpoint: `${environment.apiBaseUrl}/estimates/calculate`,
          statusCode: res.status || 200,
          statusText: res.statusText || 'OK',
          timestamp: new Date().toISOString(),
          responseTimeMs: Math.round(endTime - startTime),
          data: responseObj
        });

        return responseObj;
      }),
      catchError(err => {
        this.isApiLoading.set(false);
        this.apiError.set('حدث خطأ أثناء حساب وإرسال التقدير');
        return throwError(() => err);
      })
    );
  }
}

