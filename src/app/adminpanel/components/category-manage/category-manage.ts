import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceCategoryService } from '../../../Services/service-category.service';
import { ServiceCategory, ServiceCategoryRequest } from '../../../Models/api.models';

@Component({
  selector: 'app-category-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-manage.html',
  styleUrl: './category-manage.css'
})
export class CategoryManageComponent implements OnInit {
  categories: ServiceCategory[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Form states
  isFormOpen = false;
  isSaving = false;
  formTitle = 'إضافة تصنيف جديد';
  
  // Model bindings
  editingId: number | null = null;
  name = '';
  description = '';

  constructor(private categorySvc: ServiceCategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.isLoading = true;
    this.categorySvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.categories = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل التصنيفات';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل التصنيفات';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  openAddForm(): void {
    this.editingId = null;
    this.name = '';
    this.description = '';
    this.formTitle = 'إضافة تصنيف جديد';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  openEditForm(cat: ServiceCategory): void {
    this.editingId = cat.id;
    this.name = cat.name;
    this.description = cat.description || '';
    this.formTitle = 'تعديل التصنيف';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeForm(): void {
    this.isFormOpen = false;
  }

  onSubmit(): void {
    if (!this.name) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const body: ServiceCategoryRequest = {
      id: this.editingId || 0,
      name: this.name,
      description: this.description
    };

    if (this.editingId) {
      // Edit
      this.categorySvc.update(this.editingId, body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تم تعديل التصنيف بنجاح!';
            this.loadCategories();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل تعديل التصنيف';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تعديل التصنيف';
          this.isSaving = false;
          console.error(err);
        }
      });
    } else {
      // Add
      this.categorySvc.create(body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تمت إضافة التصنيف بنجاح!';
            this.loadCategories();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل إضافة التصنيف';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء إضافة التصنيف';
          this.isSaving = false;
          console.error(err);
        }
      });
    }
  }

  deleteCategory(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذا التصنيف؟ قد يؤثر ذلك على الخدمات والمشاريع المرتبطة به.')) {
      return;
    }

    this.categorySvc.delete(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.successMessage = 'تم حذف التصنيف بنجاح!';
          this.loadCategories();
        } else {
          this.errorMessage = res.message || 'فشل حذف التصنيف';
        }
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف التصنيف';
        console.error(err);
      }
    });
  }
}
