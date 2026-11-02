import { Component, OnInit, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { AdminAuthService } from '../admin-auth.service';

// Services for dashboard statistics
import { ProjectService } from '../../Services/project.service';
import { ServiceService } from '../../Services/service.service';
import { PackageService } from '../../Services/package.service';
import { ServiceCategoryService } from '../../Services/service-category.service';
import { CompanyService } from '../../Services/company.service';

// Subcomponents imports
import { CompanyManageComponent } from '../components/company-manage/company-manage';
import { CategoryManageComponent } from '../components/category-manage/category-manage';
import { ServiceManageComponent } from '../components/service-manage/service-manage';
import { ProjectManageComponent } from '../components/project-manage/project-manage';
import { PackageManageComponent } from '../components/package-manage/package-manage';
import { ContactSocialManageComponent } from '../components/contact-social-manage/contact-social-manage';
import { SiteSettingManageComponent } from '../components/site-setting-manage/site-setting-manage';
import { CalculatorManageComponent } from '../components/calculator-manage/calculator-manage';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CompanyManageComponent,
    CategoryManageComponent,
    ServiceManageComponent,
    ProjectManageComponent,
    PackageManageComponent,
    ContactSocialManageComponent,
    SiteSettingManageComponent,
    CalculatorManageComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  public activeTab = signal<string>('overview');
  public mobileSidebarOpen = signal<boolean>(false);

  // Overview statistics
  stats = {
    projectsCount: 0,
    servicesCount: 0,
    packagesCount: 0,
    categoriesCount: 0,
    companyName: 'جاري التحميل...'
  };
  isLoadingStats = false;

  constructor(
    private authService: AdminAuthService,
    private router: Router,
    private projectSvc: ProjectService,
    private serviceSvc: ServiceService,
    private packageSvc: PackageService,
    private categorySvc: ServiceCategoryService,
    private companySvc: CompanyService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['tab']) {
        this.activeTab.set(params['tab']);
        this.cdr.markForCheck();
      }
    });
    this.loadStats();
  }

  loadStats(): void {
    this.isLoadingStats = true;
    this.cdr.markForCheck();
    
    // Count Projects
    this.projectSvc.getAll({ PageSize: 1 }).subscribe({
      next: res => {
        if (res.succeeded) this.stats.projectsCount = res.data.totalCount;
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck()
    });

    // Count Services
    this.serviceSvc.getAll({ PageSize: 1 }).subscribe({
      next: res => {
        if (res.succeeded) this.stats.servicesCount = res.data.totalCount;
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck()
    });

    // Count Packages
    this.packageSvc.getAll({ PageSize: 1 }).subscribe({
      next: res => {
        if (res.succeeded) this.stats.packagesCount = res.data.totalCount;
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck()
    });

    // Count Categories
    this.categorySvc.getAll({ PageSize: 1 }).subscribe({
      next: res => {
        if (res.succeeded) this.stats.categoriesCount = res.data.totalCount;
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck()
    });

    // Company Name
    this.companySvc.getAll().subscribe({
      next: res => {
        if (res.succeeded && res.data && res.data.length > 0) {
          this.stats.companyName = res.data[0].name;
        } else {
          this.stats.companyName = 'RunX Tech';
        }
        this.isLoadingStats = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.stats.companyName = 'RunX Tech';
        this.isLoadingStats = false;
        this.cdr.markForCheck();
      }
    });
  }

  switchTab(tab: string): void {
    this.activeTab.set(tab);
    this.mobileSidebarOpen.set(false);
    this.router.navigate([], { queryParams: { tab }, queryParamsHandling: 'merge' });
    
    if (tab === 'overview') {
      this.loadStats();
    }
    this.cdr.markForCheck();
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update(v => !v);
  }

  onLogout(): void {
    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
      this.authService.logout();
      this.router.navigate(['/admin/login']);
    }
  }
}
