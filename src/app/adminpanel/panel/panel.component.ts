import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
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
    SiteSettingManageComponent
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class AdminPanelComponent implements OnInit {
  activeTab = 'overview';
  mobileSidebarOpen = false;

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
    private companySvc: CompanyService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoadingStats = true;
    
    // Count Projects
    this.projectSvc.getAll({ PageSize: 1 }).subscribe(res => {
      if (res.succeeded) this.stats.projectsCount = res.data.totalCount;
    });

    // Count Services
    this.serviceSvc.getAll({ PageSize: 1 }).subscribe(res => {
      if (res.succeeded) this.stats.servicesCount = res.data.totalCount;
    });

    // Count Packages
    this.packageSvc.getAll({ PageSize: 1 }).subscribe(res => {
      if (res.succeeded) this.stats.packagesCount = res.data.totalCount;
    });

    // Count Categories
    this.categorySvc.getAll({ PageSize: 1 }).subscribe(res => {
      if (res.succeeded) this.stats.categoriesCount = res.data.totalCount;
    });

    // Company Name
    this.companySvc.getAll().subscribe(res => {
      if (res.succeeded && res.data && res.data.length > 0) {
        this.stats.companyName = res.data[0].name;
      } else {
        this.stats.companyName = 'لم يتم تحديد الاسم';
      }
      this.isLoadingStats = false;
    });
  }

  switchTab(tab: string): void {
    this.activeTab = tab;
    this.mobileSidebarOpen = false;
    
    if (tab === 'overview') {
      this.loadStats();
    }
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen = !this.mobileSidebarOpen;
  }

  onLogout(): void {
    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
      this.authService.logout();
      this.router.navigate(['/admin/login']);
    }
  }
}
