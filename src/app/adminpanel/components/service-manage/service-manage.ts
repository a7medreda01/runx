import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../Services/service.service';
import { ServiceCategoryService } from '../../../Services/service-category.service';
import { Service, ServiceCategory, ServiceForm } from '../../../Models/api.models';

interface IconOption {
  id: string;
  label: string;
}

@Component({
  selector: 'app-service-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './service-manage.html',
  styleUrl: './service-manage.css'
})
export class ServiceManageComponent implements OnInit {
  services: Service[] = [];
  categories: ServiceCategory[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Form states
  isFormOpen = false;
  isSaving = false;
  formTitle = 'إضافة خدمة جديدة';

  // Model bindings for all editable fields
  editingId: number | null = null;
  name = '';
  subtitle = '';
  categoryId: number | null = null;
  priceStart: number | null = null;
  bootstrapIcon = 'bi-code-slash';
  description = '';
  
  // Dynamic features list
  featuresList: string[] = [''];

  // Dynamic technologies tags
  technologiesList: string[] = [];
  newTechInput = '';
  suggestedTechnologies = [
    'Angular', 'ASP.NET Core', 'SQL Server', 'TailwindCSS',
    'Flutter', 'React', 'Node.js', 'PostgreSQL', 'Docker',
    'Redis', 'REST API', 'Figma', 'SEO', 'AI Automation'
  ];

  // Image upload
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  // Icon options
  availableIcons: IconOption[] = [
    { id: 'bi-code-slash', label: 'برمجة وأكواد' },
    { id: 'bi-laptop', label: 'مواقع وتطبيقات ويب' },
    { id: 'bi-phone', label: 'تطبيقات جوال' },
    { id: 'bi-cloud-check', label: 'سحابة وSaaS' },
    { id: 'bi-cart4', label: 'متاجر إلكترونية' },
    { id: 'bi-shield-check', label: 'حماية وأمان' },
    { id: 'bi-database-check', label: 'قواعد بيانات' },
    { id: 'bi-graph-up-arrow', label: 'تسويق وتحليلات' },
    { id: 'bi-palette', label: 'واجهات UI/UX' },
    { id: 'bi-gear-wide-connected', label: 'تكامل أنظمة' },
    { id: 'bi-cpu', label: 'ذكاء اصطناعي' },
    { id: 'bi-rocket-takeoff', label: 'إطلاق وتطوير' }
  ];

  constructor(
    private serviceSvc: ServiceService,
    private categorySvc: ServiceCategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  loadServices(): void {
    this.isLoading = true;
    this.cdr.markForCheck();
    this.serviceSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.services = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل الخدمات';
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل الخدمات';
        this.isLoading = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  loadCategories(): void {
    this.categorySvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.categories = res.data.items;
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  getCategoryName(id: number): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : 'غير محدد';
  }

  parseFeaturesCount(featuresJson?: string): number {
    if (!featuresJson) return 0;
    try {
      const arr = JSON.parse(featuresJson);
      return Array.isArray(arr) ? arr.length : 0;
    } catch {
      return 0;
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  selectIcon(iconId: string): void {
    this.bootstrapIcon = iconId;
    this.cdr.markForCheck();
  }

  openAddForm(): void {
    this.editingId = null;
    this.name = '';
    this.subtitle = '';
    this.categoryId = this.categories.length > 0 ? this.categories[0].id : null;
    this.priceStart = null;
    this.bootstrapIcon = 'bi-code-slash';
    this.description = '';
    this.featuresList = [''];
    this.technologiesList = ['Angular', 'ASP.NET Core', 'SQL Server'];
    this.newTechInput = '';
    this.selectedImage = null;
    this.imagePreview = null;
    this.formTitle = 'إضافة خدمة جديدة';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  openEditForm(svc: Service): void {
    this.editingId = svc.id;
    this.name = svc.name;
    this.subtitle = svc.subtitle || '';
    this.categoryId = svc.serviceCategoryId;
    this.priceStart = svc.priceStart ? Number(svc.priceStart) : null;
    this.bootstrapIcon = svc.bootstrapIcon || 'bi-code-slash';
    this.description = svc.description || '';

    // Parse features
    this.featuresList = [];
    if (svc.featuresJson) {
      try {
        const parsed = JSON.parse(svc.featuresJson);
        if (Array.isArray(parsed)) {
          this.featuresList = parsed.map(f => typeof f === 'string' ? f : (f.title || f.text || ''));
        }
      } catch {}
    }
    if (this.featuresList.length === 0) {
      this.featuresList = [''];
    }

    // Parse technologies
    this.technologiesList = [];
    if (svc.technologiesJson) {
      try {
        const parsed = JSON.parse(svc.technologiesJson);
        if (Array.isArray(parsed)) {
          this.technologiesList = parsed.filter(t => typeof t === 'string');
        }
      } catch {}
    }

    this.newTechInput = '';
    this.selectedImage = null;
    this.imagePreview = svc.imageUrl;
    this.formTitle = 'تعديل الخدمة: ' + svc.name;
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.cdr.markForCheck();
  }

  // Features list management
  addFeatureInput(): void {
    this.featuresList.push('');
    this.cdr.markForCheck();
  }

  removeFeatureInput(index: number): void {
    if (this.featuresList.length > 1) {
      this.featuresList.splice(index, 1);
    } else {
      this.featuresList[0] = '';
    }
    this.cdr.markForCheck();
  }

  // Technologies management
  addTechnology(techName?: string): void {
    const val = (techName || this.newTechInput).trim();
    if (val && !this.technologiesList.includes(val)) {
      this.technologiesList.push(val);
      this.newTechInput = '';
      this.cdr.markForCheck();
    }
  }

  removeTechnology(index: number): void {
    this.technologiesList.splice(index, 1);
    this.cdr.markForCheck();
  }

  trackByIndex(index: number): number {
    return index;
  }

  onSubmit(): void {
    if (!this.name || !this.categoryId || this.isSaving) {
      if (!this.name || !this.categoryId) {
        this.errorMessage = 'الرجاء إدخال اسم الخدمة واختيار القسم المناسب';
        this.cdr.markForCheck();
      }
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();

    const cleanFeatures = this.featuresList.filter(f => f.trim().length > 0);
    const cleanTechnologies = this.technologiesList.filter(t => t.trim().length > 0);

    const form: ServiceForm = {
      Name: this.name.trim(),
      Subtitle: this.subtitle ? this.subtitle.trim() : undefined,
      Description: this.description.trim(),
      ServiceCategoryId: this.categoryId,
      PriceStart: this.priceStart !== null && this.priceStart !== undefined ? this.priceStart.toString() : undefined,
      BootstrapIcon: this.bootstrapIcon || 'bi-code-slash',
      FeaturesJson: JSON.stringify(cleanFeatures),
      TechnologiesJson: JSON.stringify(cleanTechnologies)
    };

    if (this.selectedImage) {
      form.Image = this.selectedImage;
    }

    if (this.editingId) {
      // Edit
      this.serviceSvc.update(this.editingId, form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تم تعديل كافة بيانات الخدمة بنجاح!';
            this.loadServices();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل تعديل الخدمة';
          }
          this.isSaving = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تعديل الخدمة';
          this.isSaving = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    } else {
      // Add
      this.serviceSvc.create(form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تمت إضافة الخدمة الجديدة بنجاح!';
            this.loadServices();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل إضافة الخدمة';
          }
          this.isSaving = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء إضافة الخدمة';
          this.isSaving = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    }
  }

  deleteService(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة نهائياً؟')) {
      return;
    }

    this.serviceSvc.delete(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.successMessage = 'تم حذف الخدمة بنجاح!';
          this.loadServices();
        } else {
          this.errorMessage = res.message || 'فشل حذف الخدمة';
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف الخدمة';
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }
}
