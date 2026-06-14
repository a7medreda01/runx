import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceService } from '../../../Services/service.service';
import { ServiceCategoryService } from '../../../Services/service-category.service';
import { Service, ServiceCategory, ServiceForm } from '../../../Models/api.models';

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

  // Model bindings
  editingId: number | null = null;
  name = '';
  description = '';
  categoryId: number | null = null;
  
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(
    private serviceSvc: ServiceService,
    private categorySvc: ServiceCategoryService
  ) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadCategories();
  }

  loadServices(): void {
    this.isLoading = true;
    this.serviceSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.services = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل الخدمات';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل الخدمات';
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

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagePreview = e.target.result;
      reader.readAsDataURL(file);
    }
  }

  openAddForm(): void {
    this.editingId = null;
    this.name = '';
    this.description = '';
    this.categoryId = this.categories.length > 0 ? this.categories[0].id : null;
    this.selectedImage = null;
    this.imagePreview = null;
    this.formTitle = 'إضافة خدمة جديدة';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  openEditForm(svc: Service): void {
    this.editingId = svc.id;
    this.name = svc.name;
    this.description = svc.description || '';
    this.categoryId = svc.serviceCategoryId;
    this.selectedImage = null;
    this.imagePreview = svc.imageUrl;
    this.formTitle = 'تعديل الخدمة';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeForm(): void {
    this.isFormOpen = false;
  }

  onSubmit(): void {
    if (!this.name || !this.categoryId) {
      this.errorMessage = 'الرجاء تعبئة الحقول المطلوبة واختيار القسم';
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const form: ServiceForm = {
      Name: this.name,
      Description: this.description,
      ServiceCategoryId: this.categoryId
    };

    if (this.selectedImage) {
      form.Image = this.selectedImage;
    }

    if (this.editingId) {
      // Edit
      this.serviceSvc.update(this.editingId, form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تم تعديل الخدمة بنجاح!';
            this.loadServices();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل تعديل الخدمة';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تعديل الخدمة';
          this.isSaving = false;
          console.error(err);
        }
      });
    } else {
      // Add
      this.serviceSvc.create(form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تمت إضافة الخدمة بنجاح!';
            this.loadServices();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل إضافة الخدمة';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء إضافة الخدمة';
          this.isSaving = false;
          console.error(err);
        }
      });
    }
  }

  deleteService(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
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
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف الخدمة';
        console.error(err);
      }
    });
  }
}
