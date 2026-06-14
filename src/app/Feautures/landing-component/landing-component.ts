import { Component, OnDestroy, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Company, Service, Package, Project, ServiceCategory } from '../../Models/api.models';
import { CompanyService } from '../../Services/company.service';
import { PackageService } from '../../Services/package.service';
import { ProjectService } from '../../Services/project.service';
import { ServiceCategoryService } from '../../Services/service-category.service';
import { ServiceService } from '../../Services/service.service';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../Environment/environment';


@Component({
  selector: 'app-landing-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './landing-component.html',
  styleUrl: './landing-component.css',
})
export class LandingComponent implements OnInit, OnDestroy, AfterViewInit {
 
  // ── Data ─────────────────────────────────────────────────────────────────
  company: Company | null = null;
  services: Service[] = [];
  packages: Package[] = [];
  projects: Project[] = [];
  categories: ServiceCategory[] = [];
 
  // ── Loading flags ─────────────────────────────────────────────────────────
  loadingCompany  = true;
  loadingServices = true;
  loadingPackages = true;
  loadingProjects = true;
 
  // ── Contact form model ────────────────────────────────────────────────────
  contactForm = {
    name: '',
    email: '',
    phone: '',
    serviceId: '',
    message: ''
  };
  formSubmitting = false;
  formSuccess    = false;
 
  // ── Nav scroll state ──────────────────────────────────────────────────────
  navScrolled = false;
  mobileMenuOpen = false;

  // ── Project modal state ──────────────────────────────────────────────────
  selectedProject: Project | null = null;
  selectedProjectImage: string = '';
  currentYear = new Date().getFullYear();
  isLightMode = false;
 
  private destroy$ = new Subject<void>();
  private observer: IntersectionObserver | null = null;
 
  constructor(
    private companySvc:  CompanyService,
    private serviceSvc:  ServiceService,
    private packageSvc:  PackageService,
    private projectSvc:  ProjectService,
    private categorySvc: ServiceCategoryService,
    private el: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadAll();
    window.addEventListener('scroll', this.onScroll);
    
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      this.isLightMode = true;
      const hostElement = this.el.nativeElement as HTMLElement;
      hostElement.classList.add('light-mode');
    }
  }

  toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
    const hostElement = this.el.nativeElement as HTMLElement;
    if (this.isLightMode) {
      hostElement.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      hostElement.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener('scroll', this.onScroll);
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  ngAfterViewInit(): void {
    this.initObserver();
  }

  private initObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: Stop observing once visible to prevent flickering
          this.observer!.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 }); // Lower threshold to ensure it triggers earlier

    // Periodically check for new elements (since data loads async)
    setInterval(() => this.observeElements(), 1000);
    setTimeout(() => this.observeElements(), 200);
  }

  private observeElements() {
    if (!this.observer) return;
    // Use document to ensure we find them, and mark as observed to avoid re-observing
    const hiddenElements = document.querySelectorAll('.animate-on-scroll:not(.observed)');
    hiddenElements.forEach((el: Element) => {
      el.classList.add('observed');
      this.observer!.observe(el);
    });
  }

  private preloadImages(items: any[], type: 'service'|'package'|'project') {
    items.forEach(item => {
      const url = type === 'project' ? item.coverImage : item.imageUrl;
      const finalUrl = this.getImageUrl(url, type, item.name);
      const img = new Image();
      img.src = finalUrl;
    });
  }

  scrollGrid(gridId: string, direction: 'prev' | 'next'): void {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const card = grid.firstElementChild as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth + 20; // Include gap/padding
    const isRtl = getComputedStyle(document.body).direction === 'rtl';

    let scrollAmount = 0;
    if (direction === 'next') {
      scrollAmount = isRtl ? -cardWidth : cardWidth;
    } else {
      scrollAmount = isRtl ? cardWidth : -cardWidth;
    }

    grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
 
  // ── Data loading ──────────────────────────────────────────────────────────
 
  private loadAll(): void {
    // Company
    this.companySvc.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (res.succeeded && res.data?.length) this.company = res.data[0];
          this.loadingCompany = false;
          setTimeout(() => this.observeElements(), 100);
        },
        error: () => { this.loadingCompany = false; }
      });
 
    // Services
    this.serviceSvc.getAll({ PageSize: 9 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (res.succeeded) {
            this.services = res.data.items;
            this.preloadImages(this.services, 'service');
          }
          this.loadingServices = false;
          setTimeout(() => this.observeElements(), 100);
        },
        error: () => { this.loadingServices = false; }
      });
 
    // Packages (show first 3 only)
    this.packageSvc.getAll({ PageSize: 10 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (res.succeeded) {
            this.packages = res.data.items.slice(0, 3);
            this.preloadImages(this.packages, 'package');
          }
          this.loadingPackages = false;
          setTimeout(() => this.observeElements(), 100);
        },
        error: () => { this.loadingPackages = false; }
      });
 
    // Projects
    this.projectSvc.getAll({ PageSize: 6 })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => {
          if (res.succeeded) {
            this.projects = res.data.items;
            this.preloadImages(this.projects, 'project');
          }
          this.loadingProjects = false;
          setTimeout(() => this.observeElements(), 100);
        },
        error: () => { this.loadingProjects = false; }
      });
  }
 
  // ── Helpers ───────────────────────────────────────────────────────────────
 
  getServiceIcon(name: string): string {
    const n = name.toLowerCase();
    if (n.includes('ويب') || n.includes('موقع') || n.includes('web')) return 'bi bi-globe';
    if (n.includes('تطبيق') || n.includes('هاتف') || n.includes('موبايل') || n.includes('app') || n.includes('mobile')) return 'bi bi-phone';
    if (n.includes('تصميم') || n.includes('ui') || n.includes('ux') || n.includes('design')) return 'bi bi-palette';
    if (n.includes('تسويق') || n.includes('إعلان') || n.includes('seo') || n.includes('marketing')) return 'bi bi-bar-chart-line';
    if (n.includes('هوية') || n.includes('شعار') || n.includes('برندنج') || n.includes('branding') || n.includes('logo')) return 'bi bi-award';
    if (n.includes('ديكور') || n.includes('داخلي') || n.includes('interior')) return 'bi bi-house-door';
    if (n.includes('معماري') || n.includes('هندسي') || n.includes('engineering')) return 'bi bi-compass';
    return 'bi bi-gear';
  }
 
  getImageUrl(url: string | null, type: 'service' | 'package' | 'project' | 'company', name: string = ''): string {
    if (!url || url.trim() === '') {
      if (type === 'company') {
        return 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&auto=format&fit=crop&q=80';
      }
      const lowerName = name.toLowerCase();
      if (type === 'service') {
        if (lowerName.includes('ويب') || lowerName.includes('موقع') || lowerName.includes('web')) {
          return 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('تطبيق') || lowerName.includes('موبايل') || lowerName.includes('هاتف') || lowerName.includes('mobile') || lowerName.includes('app')) {
          return 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('تصميم') || lowerName.includes('ui') || lowerName.includes('ux') || lowerName.includes('design')) {
          return 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('تسويق') || lowerName.includes('seo') || lowerName.includes('marketing')) {
          return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('سحاب') || lowerName.includes('cloud') || lowerName.includes('استضافة') || lowerName.includes('سيرفر')) {
          return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('بيانات') || lowerName.includes('ذكاء') || lowerName.includes('ai') || lowerName.includes('data')) {
          return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('أمن') || lowerName.includes('حماية') || lowerName.includes('cyber') || lowerName.includes('security')) {
          return 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80';
        }
        return 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&auto=format&fit=crop&q=80';
      } else if (type === 'package') {
        if (lowerName.includes('أساس') || lowerName.includes('basic') || lowerName.includes('بداية') || lowerName.includes('starter')) {
          return 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('احترف') || lowerName.includes('pro') || lowerName.includes('premium')) {
          return 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&auto=format&fit=crop&q=80';
        }
        return 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80';
      } else {
        // Projects
        if (lowerName.includes('ويب') || lowerName.includes('موقع') || lowerName.includes('web')) {
          return 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80';
        }
        if (lowerName.includes('تطبيق') || lowerName.includes('موبايل') || lowerName.includes('mobile')) {
          return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80';
        }
        return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80';
      }
    }
 
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
 
    // Clean up relative path and prepend base API url (stripped of /api)
    const rootUrl = environment.apiBaseUrl.replace(/\/api\/?$/, '');
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return `${rootUrl}${cleanPath}`;
  }

  // ── Project modal ──────────────────────────────────────────────────────

  openProject(project: Project): void {
    this.selectedProject = project;
    this.selectedProjectImage = this.getImageUrl(project.coverImage, 'project', project.name);
    document.body.style.overflow = 'hidden';
  }

  closeProject(): void {
    this.selectedProject = null;
    this.selectedProjectImage = '';
    document.body.style.overflow = '';
  }

  selectProjectImage(url: string): void {
    this.selectedProjectImage = url;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('ar-SA').format(price);
  }
 
  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric', month: 'long'
    });
  }
 
  isFeaturedPackage(index: number): boolean {
    return index === Math.floor(this.packages.length / 2);
  }
 
  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.mobileMenuOpen = false;
  }
 
  private onScroll = (): void => {
    this.navScrolled = window.scrollY > 40;
  };
 
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
 
  submitForm(): void {
    if (!this.contactForm.name || !this.contactForm.email) return;
    this.formSubmitting = true;

    // Find the name of the selected service
    const selectedService = this.services.find(s => String(s.id) === String(this.contactForm.serviceId));
    const serviceName = selectedService ? selectedService.name : 'غير محدد';

    // Format the WhatsApp message
    const companyWhatsApp = '201080225502';
    const messageText = `السلام عليكم ورحمة الله وبركاته،
أود الاستفسار عن خدمة وبدء مشروع جديد معكم. تفاصيل الطلب:

👤 *الاسم الكامل:* ${this.contactForm.name}
📧 *البريد الإلكتروني:* ${this.contactForm.email}
📱 *رقم الجوال:* ${this.contactForm.phone || 'غير محدد'}
🛠️ *الخدمة المطلوبة:* ${serviceName}
📝 *تفاصيل المشروع:*
${this.contactForm.message || 'لا توجد تفاصيل إضافية'}`;

    const encodedText = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${companyWhatsApp}?text=${encodedText}`;

    // Redirect to WhatsApp immediately
    window.open(whatsappUrl, '_blank');

    this.formSubmitting = false;
    this.formSuccess = true;
    
    // Reset form
    this.contactForm = { name: '', email: '', phone: '', serviceId: '', message: '' };
    
    setTimeout(() => {
      this.formSuccess = false;
    }, 4000);
  }

  getSocialIcon(platform: string): string {
    const p = platform.toLowerCase().trim();
    if (p.includes('facebook')) return 'bi bi-facebook';
    if (p.includes('instagram')) return 'bi bi-instagram';
    if (p.includes('twitter') || p.includes('x.com') || p === 'x') return 'bi bi-twitter-x';
    if (p.includes('linkedin')) return 'bi bi-linkedin';
    if (p.includes('youtube')) return 'bi bi-youtube';
    if (p.includes('tiktok')) return 'bi bi-tiktok';
    if (p.includes('snapchat')) return 'bi bi-snapchat';
    if (p.includes('whatsapp')) return 'bi bi-whatsapp';
    return 'bi bi-link-45deg';
  }
}
