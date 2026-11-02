import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../../Services/project.service';
import { ServiceCategoryService } from '../../../Services/service-category.service';
import { Project, ServiceCategory, ProjectForm, ProjectImage } from '../../../Models/api.models';

interface ChallengeItem {
  challenge: string;
  solution: string;
}

interface MetricItem {
  label: string;
  value: string;
}

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})
export class ProjectEditComponent implements OnInit {
  isNew = false;
  projectId: number | null = null;
  isLoading = false;
  isSaving = false;
  isUploadingGallery = false;

  successMessage = '';
  errorMessage = '';

  // Form Fields
  name = '';
  serviceCategoryId: number | null = null;
  client = '';
  duration = '';
  role = '';
  executionDate = '';
  liveUrl = '';
  featured = true;
  description = '';

  // Cover image
  coverImageUrl: string | null = null;
  selectedCoverFile: File | null = null;
  coverPreviewUrl: string | null = null;

  // Dynamic Lists
  challenges: ChallengeItem[] = [];
  keyFeatures: string[] = [];
  technologies: string[] = [];
  metrics: MetricItem[] = [];
  gallery: ProjectImage[] = [];

  // Technology input helper
  newTechInput = '';
  commonTechSuggestions: string[] = [
    'Angular', 'ASP.NET Core', 'SQL Server', 'TailwindCSS',
    'TypeScript', 'Flutter', 'React', 'Next.js', 'Node.js',
    'PostgreSQL', 'Docker', 'Redis', 'Firebase', 'REST API'
  ];

  // Categories list
  categories: ServiceCategory[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectSvc: ProjectService,
    private categorySvc: ServiceCategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (!idParam || idParam === 'new') {
        this.initNewProject();
      } else {
        const id = parseInt(idParam, 10);
        if (isNaN(id)) {
          this.initNewProject();
        } else {
          this.projectId = id;
          this.isNew = false;
          this.loadProject(id);
        }
      }
    });
  }

  loadCategories(): void {
    this.categorySvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded && res.data?.items) {
          this.categories = res.data.items;
          if (this.isNew && !this.serviceCategoryId && this.categories.length > 0) {
            this.serviceCategoryId = this.categories[0].id;
          }
        }
        this.cdr.markForCheck();
      },
      error: () => this.cdr.markForCheck()
    });
  }

  getCategoryName(id: number | null): string {
    if (!id) return '';
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : '';
  }

  initNewProject(): void {
    this.isNew = true;
    this.projectId = null;
    this.name = '';
    this.serviceCategoryId = this.categories.length > 0 ? this.categories[0].id : null;
    this.client = '';
    this.duration = '';
    this.role = 'تطوير وتنفيذ متكامل';
    this.executionDate = new Date().toISOString().substring(0, 10);
    this.liveUrl = '';
    this.featured = true;
    this.description = '';
    this.coverImageUrl = null;
    this.selectedCoverFile = null;
    this.coverPreviewUrl = null;

    this.challenges = [
      { challenge: '', solution: '' }
    ];
    this.keyFeatures = [''];
    this.technologies = ['Angular', 'ASP.NET Core', 'SQL Server'];
    this.metrics = [
      { label: '', value: '' }
    ];
    this.gallery = [];
    this.cdr.markForCheck();
  }

  loadProject(id: number): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.cdr.markForCheck();

    this.projectSvc.getById(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.succeeded && res.data) {
          const p = res.data;
          this.name = p.name || '';
          this.serviceCategoryId = p.serviceCategoryId;
          this.client = p.client || '';
          this.duration = p.duration || '';
          this.role = p.role || '';
          this.liveUrl = p.liveUrl || '';
          this.featured = p.featured ?? true;
          this.description = p.description || '';
          this.coverImageUrl = p.coverImage || null;
          this.gallery = p.images || [];

          if (p.executionDate) {
            this.executionDate = p.executionDate.split('T')[0];
          } else {
            this.executionDate = new Date().toISOString().substring(0, 10);
          }

          // Parse Challenges
          this.challenges = [];
          if (p.challengeSolutionsJson) {
            try {
              const parsed = JSON.parse(p.challengeSolutionsJson);
              if (Array.isArray(parsed)) {
                this.challenges = parsed.map(c => ({
                  challenge: c.challenge || c.Challenge || '',
                  solution: c.solution || c.Solution || ''
                }));
              }
            } catch {}
          }
          if (this.challenges.length === 0) {
            this.challenges.push({ challenge: '', solution: '' });
          }

          // Parse Key Features
          this.keyFeatures = [];
          if (p.keyFeaturesJson) {
            try {
              const parsed = JSON.parse(p.keyFeaturesJson);
              if (Array.isArray(parsed)) {
                this.keyFeatures = parsed.map(f => typeof f === 'string' ? f : (f.title || f.text || ''));
              }
            } catch {}
          }
          if (this.keyFeatures.length === 0) {
            this.keyFeatures.push('');
          }

          // Parse Technologies
          this.technologies = [];
          if (p.technologiesJson) {
            try {
              const parsed = JSON.parse(p.technologiesJson);
              if (Array.isArray(parsed)) {
                this.technologies = parsed.filter(t => typeof t === 'string');
              }
            } catch {}
          }

          // Parse Metrics
          this.metrics = [];
          if (p.metricsJson) {
            try {
              const parsed = JSON.parse(p.metricsJson);
              if (Array.isArray(parsed)) {
                this.metrics = parsed.map(m => ({
                  label: m.label || m.Label || '',
                  value: m.value || m.Value || ''
                }));
              }
            } catch {}
          }
        } else {
          this.errorMessage = res.message || 'تعذر تحميل بيانات المشروع';
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'حدث خطأ أثناء الاتصال بالخادم لتحميل المشروع';
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  // Cover Image Selection
  onCoverSelected(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      this.selectedCoverFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.coverPreviewUrl = e.target.result;
        this.cdr.markForCheck();
      };
      reader.readAsDataURL(file);
    }
  }

  removeCover(): void {
    this.selectedCoverFile = null;
    this.coverPreviewUrl = null;
    this.coverImageUrl = null;
    this.cdr.markForCheck();
  }

  // Challenges Handlers
  addChallenge(): void {
    this.challenges.push({ challenge: '', solution: '' });
    this.cdr.markForCheck();
  }

  removeChallenge(index: number): void {
    if (this.challenges.length > 1) {
      this.challenges.splice(index, 1);
    } else {
      this.challenges[0] = { challenge: '', solution: '' };
    }
    this.cdr.markForCheck();
  }

  // Key Features Handlers
  addFeature(): void {
    this.keyFeatures.push('');
    this.cdr.markForCheck();
  }

  removeFeature(index: number): void {
    if (this.keyFeatures.length > 1) {
      this.keyFeatures.splice(index, 1);
    } else {
      this.keyFeatures[0] = '';
    }
    this.cdr.markForCheck();
  }

  trackByIndex(index: number): number {
    return index;
  }

  // Technologies Handlers
  addTechnology(name?: string): void {
    const tech = (name || this.newTechInput).trim();
    if (tech && !this.technologies.includes(tech)) {
      this.technologies.push(tech);
      this.newTechInput = '';
      this.cdr.markForCheck();
    }
  }

  removeTechnology(index: number): void {
    this.technologies.splice(index, 1);
    this.cdr.markForCheck();
  }

  onTechKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.addTechnology();
    }
  }

  // Metrics Handlers
  addMetric(): void {
    this.metrics.push({ label: '', value: '' });
    this.cdr.markForCheck();
  }

  removeMetric(index: number): void {
    this.metrics.splice(index, 1);
    this.cdr.markForCheck();
  }

  // Gallery Handlers
  onGallerySelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    if (this.isNew || !this.projectId) {
      alert('الرجاء حفظ المشروع أولاً قبل رفع صور المعرض الملحقة.');
      return;
    }

    const filesArray = Array.from(files);
    this.isUploadingGallery = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();

    const uploads = filesArray.map(file =>
      this.projectSvc.addImage(this.projectId!, file).toPromise()
    );

    Promise.allSettled(uploads).then(results => {
      const succeeded = results.filter(r => r.status === 'fulfilled' && (r as any).value?.succeeded).length;
      const failed = results.length - succeeded;

      if (failed === 0) {
        this.successMessage = `تم رفع ${succeeded} صور بنجاح إلى المعرض!`;
      } else {
        this.successMessage = `تم رفع ${succeeded} صور بنجاح، وفشل ${failed}.`;
      }

      // Reload project gallery
      this.projectSvc.getById(this.projectId!).subscribe(res => {
        if (res.succeeded && res.data) {
          this.gallery = res.data.images || [];
        }
        this.isUploadingGallery = false;
        this.cdr.markForCheck();
      });
    });
  }

  deleteGalleryImage(imageId: number): void {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة من المعرض؟')) return;

    this.projectSvc.deleteImage(imageId).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.gallery = this.gallery.filter(img => img.id !== imageId);
          this.successMessage = 'تم حذف الصورة من المعرض بنجاح.';
        } else {
          this.errorMessage = res.message || 'فشل حذف الصورة';
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'حدث خطأ أثناء محاولة حذف الصورة';
        this.cdr.markForCheck();
      }
    });
  }

  // Submit / Save
  onSubmit(): void {
    if (this.isSaving || this.isLoading) return;

    if (!this.name.trim()) {
      this.errorMessage = 'الرجاء إدخال اسم المشروع';
      this.cdr.markForCheck();
      return;
    }

    if (!this.serviceCategoryId) {
      this.errorMessage = 'الرجاء اختيار تصنيف الخدمة المناسب للمشروع';
      this.cdr.markForCheck();
      return;
    }

    if (!this.executionDate) {
      this.errorMessage = 'الرجاء تحديد تاريخ تنفيذ المشروع';
      this.cdr.markForCheck();
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();

    // Clean & Serialize dynamic lists
    const cleanChallenges = this.challenges.filter(c => c.challenge.trim() || c.solution.trim());
    const cleanFeatures = this.keyFeatures.filter(f => f.trim().length > 0);
    const cleanMetrics = this.metrics.filter(m => m.label.trim() || m.value.trim());

    const technologiesJson = JSON.stringify(this.technologies);
    const keyFeaturesJson = JSON.stringify(cleanFeatures);
    const metricsJson = JSON.stringify(cleanMetrics);
    const challengeSolutionsJson = JSON.stringify(cleanChallenges);

    const form: ProjectForm = {
      Name: this.name.trim(),
      Description: this.description.trim(),
      ExecutionDate: this.executionDate,
      ServiceCategoryId: Number(this.serviceCategoryId),
      Client: this.client.trim(),
      Duration: this.duration.trim(),
      Role: this.role.trim(),
      LiveUrl: this.liveUrl.trim(),
      Featured: this.featured,
      TechnologiesJson: technologiesJson,
      KeyFeaturesJson: keyFeaturesJson,
      MetricsJson: metricsJson,
      ChallengeSolutionsJson: challengeSolutionsJson
    };

    if (this.selectedCoverFile) {
      form.Image = this.selectedCoverFile;
    }

    if (this.isNew || !this.projectId) {
      // Create New
      this.projectSvc.create(form).subscribe({
        next: (res) => {
          this.isSaving = false;
          if (res.succeeded && res.data) {
            this.successMessage = 'تمت إضافة المشروع الجديد بنجاح!';
            this.projectId = res.data.id;
            this.isNew = false;
            this.cdr.markForCheck();
            // Navigate to edit route so URL reflects project id
            this.router.navigate(['/admin/projects/edit', res.data.id], { replaceUrl: true });
          } else {
            this.errorMessage = res.message || 'فشل حفظ المشروع';
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = 'حدث خطأ غير متوقع أثناء إضافة المشروع';
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    } else {
      // Update Existing
      this.projectSvc.update(this.projectId, form).subscribe({
        next: (res) => {
          this.isSaving = false;
          if (res.succeeded) {
            this.successMessage = 'تم حفظ وتحديث جميع بيانات المشروع بنجاح!';
            // Refresh project to get latest image URLs
            this.loadProject(this.projectId!);
          } else {
            this.errorMessage = res.message || 'فشل تحديث بيانات المشروع';
            this.cdr.markForCheck();
          }
        },
        error: (err) => {
          this.isSaving = false;
          this.errorMessage = 'حدث خطأ أثناء تحديث المشروع في الخادم';
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/admin'], { queryParams: { tab: 'projects' } });
  }
}
