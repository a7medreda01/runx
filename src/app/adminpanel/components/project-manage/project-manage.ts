import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../Services/project.service';
import { ServiceCategoryService } from '../../../Services/service-category.service';
import { Project, ServiceCategory, ProjectForm, ProjectImage } from '../../../Models/api.models';

@Component({
  selector: 'app-project-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-manage.html',
  styleUrl: './project-manage.css'
})
export class ProjectManageComponent implements OnInit {
  projects: Project[] = [];
  categories: ServiceCategory[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Form states
  isFormOpen = false;
  isSaving = false;
  formTitle = 'إضافة مشروع جديد';

  // Model bindings
  editingId: number | null = null;
  name = '';
  description = '';
  executionDate = '';
  categoryId: number | null = null;
  
  selectedCover: File | null = null;
  coverPreview: string | null = null;

  // Sub-images gallery uploads
  projectGallery: ProjectImage[] = [];
  selectedGalleryFiles: File[] = [];
  isUploadingGallery = false;

  constructor(
    private projectSvc: ProjectService,
    private categorySvc: ServiceCategoryService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadCategories();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.projectSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.projects = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل المشاريع';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل المشاريع';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  loadCategories(): void {
    this.categorySvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.categories = res.data.items;
        }
      },
      error: (err) => {
        console.error('Error loading categories', err);
      }
    });
  }

  onCoverSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedCover = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.coverPreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  onGallerySelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedGalleryFiles = Array.from(files);
    }
  }

  openAddForm(): void {
    this.editingId = null;
    this.name = '';
    this.description = '';
    this.executionDate = new Date().toISOString().substring(0, 10);
    this.categoryId = this.categories.length > 0 ? this.categories[0].id : null;
    this.selectedCover = null;
    this.coverPreview = null;
    this.projectGallery = [];
    this.selectedGalleryFiles = [];
    this.formTitle = 'إضافة مشروع جديد';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  openEditForm(proj: Project): void {
    this.editingId = proj.id;
    this.name = proj.name;
    this.description = proj.description || '';
    
    // Normalize date format to yyyy-MM-dd for HTML input[type="date"]
    if (proj.executionDate) {
      this.executionDate = proj.executionDate.split('T')[0];
    } else {
      this.executionDate = new Date().toISOString().substring(0, 10);
    }

    this.categoryId = proj.serviceCategoryId;
    this.selectedCover = null;
    this.coverPreview = proj.coverImage;
    this.projectGallery = proj.images || [];
    this.selectedGalleryFiles = [];
    this.formTitle = 'تعديل المشروع';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeForm(): void {
    this.isFormOpen = false;
  }

  onSubmit(): void {
    if (!this.name || !this.categoryId || !this.executionDate) {
      this.errorMessage = 'الرجاء تعبئة الحقول المطلوبة واختيار القسم وتاريخ التنفيذ';
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const form: ProjectForm = {
      Name: this.name,
      Description: this.description,
      ExecutionDate: this.executionDate,
      ServiceCategoryId: this.categoryId
    };

    if (this.selectedCover) {
      form.Image = this.selectedCover;
    }

    if (this.editingId) {
      // Edit
      this.projectSvc.update(this.editingId, form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تم تعديل بيانات المشروع بنجاح!';
            this.loadProjects();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل تعديل المشروع';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تعديل المشروع';
          this.isSaving = false;
          console.error(err);
        }
      });
    } else {
      // Add
      this.projectSvc.create(form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تمت إضافة المشروع بنجاح!';
            
            // If there are gallery files, upload them
            if (this.selectedGalleryFiles.length > 0 && res.data.id) {
              this.uploadGalleryImages(res.data.id);
            } else {
              this.loadProjects();
              this.closeForm();
            }
          } else {
            this.errorMessage = res.message || 'فشل إضافة المشروع';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء إضافة المشروع';
          this.isSaving = false;
          console.error(err);
        }
      });
    }
  }

  uploadGalleryImages(projectId: number): void {
    if (this.selectedGalleryFiles.length === 0) return;

    this.isUploadingGallery = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Upload images one by one using the correct endpoint
    const uploads = this.selectedGalleryFiles.map(file =>
      this.projectSvc.addImage(projectId, file).toPromise()
    );

    Promise.allSettled(uploads).then(results => {
      const failed = results.filter(r => r.status === 'rejected' || (r.status === 'fulfilled' && !r.value?.succeeded));
      if (failed.length === 0) {
        this.successMessage = `تم رفع ${results.length} صورة بنجاح!`;
      } else {
        this.successMessage = `تم رفع ${results.length - failed.length} صورة، وفشل ${failed.length}.`;
      }
      this.selectedGalleryFiles = [];
      // Reload project to update gallery
      this.projectSvc.getById(projectId).subscribe(res => {
        if (res.succeeded) this.projectGallery = res.data.images || [];
        // Also reload the full list
        this.loadProjects();
      });
      this.isUploadingGallery = false;
    });
  }

  deleteGalleryImage(imageId: number): void {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة من المعرض؟')) return;

    this.projectSvc.deleteImage(imageId).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.projectGallery = this.projectGallery.filter(img => img.id !== imageId);
          this.successMessage = 'تم حذف الصورة بنجاح!';
          this.loadProjects();
        } else {
          this.errorMessage = res.message || 'فشل حذف الصورة';
        }
      },
      error: () => {
        this.errorMessage = 'حدث خطأ أثناء حذف الصورة';
      }
    });
  }

  deleteProject(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) {
      return;
    }

    this.projectSvc.delete(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.successMessage = 'تم حذف المشروع بنجاح!';
          this.loadProjects();
        } else {
          this.errorMessage = res.message || 'فشل حذف المشروع';
        }
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف المشروع';
        console.error(err);
      }
    });
  }
}
