import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private http = inject(HttpClient);

  // Initial projects showcase for runx tech
  private initialProjects: Project[] = [
    {
      id: 'proj-1',
      title: 'منصة "سند" لإدارة المواعيد والخدمات الرقمية',
      category: 'saas',
      categoryLabel: 'منصات سحابية SaaS',
      summary: 'منصة سحابية متكاملة لحجز وتأكيد المواعيد وإدارة العملاء والمدفوعات الإلكترونية بذكاء اصطناعي.',
      description: 'تم تصميم وبناء منصة "سند" لتوفير حل أتمتة شامل للشركات والمؤسسات الخدمية. تتضمن لوحة تحكم فورية، ربط مع بوابة الدفع الإلكتروني، نظام إشعارات واتساب، وتقارير أداء دقيقة.',
      imageUrl: '/assets/images/saas_dashboard_preview_1786458589392.jpg',
      galleryImages: [
        '/assets/images/saas_dashboard_preview_1786458589392.jpg',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        '/assets/images/hero_tech_showcase_1786458572855.jpg',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      ],
      liveUrl: 'https://runxtech.com/demo/sanad',
      client: 'مؤسسة أفق للتطوير',
      duration: '4 أشهر',
      role: 'التطوير الهندسي وتصميم الواجهات الشامل',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
      featured: true,
      year: '2025',
      metrics: [
        { label: 'زيادة المبيعات', value: '+140%' },
        { label: 'عدد الحجوزات', value: '50K+' },
        { label: 'معدل الرضا', value: '99.2%' }
      ],
      keyFeatures: [
        'نظام حجز ذكي ومؤتمت بالكامل مع إشعارات وتنبيهات واتساب فورية',
        'لوحة تحكم تفاعلية متطورة لإدارة المواعيد والعملاء والمدفوعات',
        'ربط آمن مع بوابات الدفع الإلكتروني المحلية والدولية (مدى، أبل باي، فيزا)',
        'تصدير التقارير المالية والإحصائيات الفورية بنقرة زر واحدة'
      ],
      challengeSolution: [
        {
          challenge: 'بطء عملية معالجة المواعيد المتزامنة في أوقات الذروة والتضارب بين العملاء.',
          solution: 'تطوير محرك حجز آني (Real-time Booking Engine) يعتمد على WebSockets وزمن استجابة أقل من 50ms.'
        },
        {
          challenge: 'صعوبة تتبع التقارير المالية المتعددة للفروع المختلفة.',
          solution: 'بناء لوحة تحكم تحليلية تدمج تقارير الفروع في شاشات تفاعلية فورية مخصصة.'
        }
      ]
    },
    {
      id: 'proj-2',
      title: 'متجر "ڤينيكس" الفاخر للماركات والعطور',
      category: 'ecommerce',
      categoryLabel: 'تجارة إلكترونية',
      summary: 'متجر إلكتروني عالي الأداء بتصميم راقي وتجربة تسوق سلسة مع نظام توصيل وفواتير فورية.',
      description: 'بناء متجر إلكتروني بمعايير عالمية يركز على السرعة الفائقة وتجربة مستخدم متميزة. يدعم التصفح السريع، متعدد العملات، خيارات دفع متعددة (مدى، أبل باي، تمارا)، وإدارة مخزون حية.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        '/assets/images/saas_dashboard_preview_1786458589392.jpg',
        'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1200&q=80'
      ],
      liveUrl: 'https://runxtech.com/demo/vinnix',
      client: 'مجموعة ڤينيكس التجارية',
      duration: '3 أشهر',
      role: 'تطوير متجر مخصص وتكامل بوابات الدفع',
      technologies: ['Angular', 'RxJS', 'Express.js', 'Stripe', 'Redis'],
      featured: true,
      year: '2024',
      metrics: [
        { label: 'سرعة التحميل', value: '0.8s' },
        { label: 'معدل التحويل', value: '4.8%' }
      ],
      keyFeatures: [
        'تجربة تسوق فائقة السرعة بفضل التقنيات الحديثة وإلغاء إعادة التحميل',
        'دعم الدفع الآجل بالتقسيط (تمارا وتابي) بالإضافة لبوابات الدفع المباشرة',
        'نظام بحث وفلترة ذكي للمنتجات حسب العائلة العطرية والأسعار',
        'مزامنة حية مع مخازن الفروع لمنع الشراء الفائض'
      ],
      challengeSolution: [
        {
          challenge: 'انخفاض معدل إتمام الشراء بسبب تعقيد خطوة إدخال بيانات الشحن والدفع.',
          solution: 'إعادة تصميم عملية الدفع (One-Page Checkout) وتخفيض خطوات الشراء لخطوتين فقط.'
        }
      ]
    },
    {
      id: 'proj-3',
      title: 'تطبيق "تراك أون" للوجستيات وتتبع الشحنات',
      category: 'mobile',
      categoryLabel: 'تطبيقات الجوال',
      summary: 'تطبيق جوال تفاعلي للجيل القادم يوفر تتبع مباشر للخرائط والشحنات مع إشعارات ذكية.',
      description: 'تطبيق آيفون وأندرويد مزود بنظام تتبع الجغرافية الحي لمتابعة حركة السائقين والشحنات لحظة بلحظة، مع إمكانية التوقيع الإلكتروني وتقييم الخدمة.',
      imageUrl: '/assets/images/mobile_app_preview_1786458603836.jpg',
      galleryImages: [
        '/assets/images/mobile_app_preview_1786458603836.jpg',
        'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
        '/assets/images/hero_tech_showcase_1786458572855.jpg'
      ],
      liveUrl: 'https://runxtech.com/demo/trackon',
      client: 'شركة المسار السريع للوجستيات',
      duration: '5 أشهر',
      role: 'تطوير التطبيق الذكي ونظام الخرائط الحية',
      technologies: ['Flutter', 'Node.js', 'Google Maps API', 'Firebase'],
      featured: true,
      year: '2024',
      metrics: [
        { label: 'تنزيلات التطبيق', value: '100K+' },
        { label: 'تقييم المتجر', value: '4.9 ★' }
      ],
      keyFeatures: [
        'خريطة حية تفاعلية لتتبع مسار السائقين والشحنات بدقة عالية',
        'إشعارات فورية متقدمة عند تغيّر حالة الطلب أو اقتراب التوصيل',
        'توقيع إلكتروني حي عند تسليم الشحنة مع حفظ الإيصالات الرقمية',
        'واجهة تطبيق خفيفة تعمل بسلاسة في مختلف ظروف الاتصال بالإنترنت'
      ],
      challengeSolution: [
        {
          challenge: 'استهلاك عالي للبطارية أثناء التتبع المستمر في خلفية الجوال.',
          solution: 'تحسين خوارزميات تحديث الإحداثيات الجغرافية لتعمل بنظام النبض الذكي (Adaptive GPS Polling).'
        }
      ]
    },
    {
      id: 'proj-4',
      title: 'البوابة المؤسسية لمجموعة "نماء" الاستثمارية',
      category: 'web',
      categoryLabel: 'مواقع شركات',
      summary: 'موقع تعريفي فاخر يعكس هوية وثقل الشركة الاستثمارية مع مركز للمستثمرين والأخبار.',
      description: 'تطوير موقع إلكتروني استثماري ذو طابع فخم بالكامل وفق دليل الهوية. يتضمن إحصائيات حية، ملفات التقارير السنوية، واستمارة التقديم والفرص الاستثمارية.',
      imageUrl: '/assets/images/hero_tech_showcase_1786458572855.jpg',
      galleryImages: [
        '/assets/images/hero_tech_showcase_1786458572855.jpg',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        '/assets/images/saas_dashboard_preview_1786458589392.jpg'
      ],
      liveUrl: 'https://runxtech.com/demo/namaa',
      client: 'مجموعة نماء المالية',
      duration: '2 شهر',
      role: 'تصميم الواجهات الفاخرة وتطوير الموقع',
      technologies: ['Angular', 'TypeScript', 'SCSS', 'Tailwind CSS'],
      featured: false,
      year: '2024',
      metrics: [
        { label: 'عدد الزوار', value: '250K/شهر' }
      ],
      keyFeatures: [
        'تصميم فاخر وعصري يعكس الثقل المالي والاستثماري للمجموعة',
        'مركز إعلامي متكامل لنشر التقارير السنوية والأخبار الصحفية',
        'نموذج استقبال طلبات الفرص الاستثمارية المشفر بآمان كامل'
      ]
    },
    {
      id: 'proj-5',
      title: 'نظام "أداء" لإدارة موارد المؤسسات ERP',
      category: 'custom',
      categoryLabel: 'أنظمة مخصصة',
      summary: 'حل برمجي مخصص شامل لإدارة المبيعات، المشتريات، والموارد البشرية للمصانع والشركات.',
      description: 'نظام إدارة مؤسسي داخلي محمي بأعلى معايير الأمان الأمني والتأمين السحابي، يربط الفروع، المخازن، والمالية في شاشة واحدة مبسطة.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        '/assets/images/saas_dashboard_preview_1786458589392.jpg',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'
      ],
      liveUrl: 'https://runxtech.com/demo/adaa',
      client: 'مصانع الخليج للصناعات',
      duration: '6 أشهر',
      role: 'هندسة الأنظمة السحابية والربط المؤسسي',
      technologies: ['Angular', 'NestJS', 'PostgreSQL', 'Docker'],
      featured: true,
      year: '2025',
      metrics: [
        { label: 'توفير الوقت', value: '65%' }
      ],
      keyFeatures: [
        'ربط العمليات الحسابية والمستودعات والموظفين في نظام واحد محمي',
        'إصدار الفواتير الضريبية الإلكترونية المعتمدة تلقائياً',
        'صلاحيات وصول دقيقة ومخصصة لكافة المستويات الإدارية'
      ]
    }
  ];

  // Signal State Management
  private projectsSignal = signal<Project[]>(this.initialProjects);
  public selectedCategory = signal<string>('all');
  public searchQuery = signal<string>('');
  public isLoading = signal<boolean>(false);

  // Computed Filtered Projects
  public filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    return this.projectsSignal().filter(p => {
      const matchCat = category === 'all' || p.category === category;
      const matchQuery = !query || 
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  });

  public featuredProjects = computed(() => {
    return this.projectsSignal().filter(p => p.featured);
  });

  constructor() {
    this.fetchProjectsFromApi();
  }

  // Fetch from real API endpoint
  public fetchProjectsFromApi() {
    this.isLoading.set(true);
    this.http.get<Project[]>('/api/projects.json').pipe(
      tap(projects => {
        if (projects && projects.length > 0) {
          this.projectsSignal.set(projects);
        }
        this.isLoading.set(false);
      }),
      catchError(() => {
        // Fallback gracefully to default curated runx tech projects
        this.isLoading.set(false);
        return of(this.initialProjects);
      })
    ).subscribe();
  }

  public getProjectById(id: string): Project | undefined {
    return this.projectsSignal().find(p => p.id === id);
  }
}
