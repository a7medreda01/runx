import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackageService } from '../../../Services/package.service';
import { Package, PackageForm } from '../../../Models/api.models';

@Component({
  selector: 'app-package-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './package-manage.html',
  styleUrl: './package-manage.css'
})
export class PackageManageComponent implements OnInit {
  packages: Package[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Form states
  isFormOpen = false;
  isSaving = false;
  formTitle = 'إضافة باقة جديدة';

  // Model bindings
  editingId: number | null = null;
  name = '';
  price = 0;
  description = '';
  
  // Package features dynamic input bindings
  featuresList: string[] = [];

  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor(private packageSvc: PackageService) {}

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.isLoading = true;
    this.packageSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.packages = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل الباقات';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل الباقات';
        this.isLoading = false;
        console.error(err);
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
    this.price = 0;
    this.description = '';
    this.featuresList = [''];
    this.selectedImage = null;
    this.imagePreview = null;
    this.formTitle = 'إضافة باقة جديدة';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  openEditForm(pkg: Package): void {
    this.editingId = pkg.id;
    this.name = pkg.name;
    this.price = pkg.price;
    this.description = pkg.description || '';
    
    // Load existing features into our dynamic list
    if (pkg.features && pkg.features.length > 0) {
      this.featuresList = pkg.features.map(f => f.title);
    } else {
      this.featuresList = [''];
    }

    this.selectedImage = null;
    this.imagePreview = pkg.imageUrl;
    this.formTitle = 'تعديل الباقة';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
  }

  closeForm(): void {
    this.isFormOpen = false;
  }

  addFeatureInput(): void {
    this.featuresList.push('');
  }

  removeFeatureInput(index: number): void {
    if (this.featuresList.length > 1) {
      this.featuresList.splice(index, 1);
    } else {
      this.featuresList[0] = '';
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  onSubmit(): void {
    if (!this.name || this.price === null || this.price === undefined) {
      this.errorMessage = 'الرجاء إدخال اسم الباقة وسعرها';
      return;
    }

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    // Filter out empty features
    const cleanFeatures = this.featuresList.filter(f => f.trim() !== '');

    const form: PackageForm = {
      Name: this.name,
      Price: this.price,
      Description: this.description,
      Features: cleanFeatures
    };

    if (this.selectedImage) {
      form.Image = this.selectedImage;
    }

    if (this.editingId) {
      // Edit
      this.packageSvc.update(this.editingId, form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تم تعديل الباقة بنجاح!';
            this.loadPackages();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل تعديل الباقة';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تعديل الباقة';
          this.isSaving = false;
          console.error(err);
        }
      });
    } else {
      // Add
      this.packageSvc.create(form).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تمت إضافة الباقة بنجاح!';
            this.loadPackages();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل إضافة الباقة';
          }
          this.isSaving = false;
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء إضافة الباقة';
          this.isSaving = false;
          console.error(err);
        }
      });
    }
  }

  deletePackage(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذه الباقة؟')) {
      return;
    }

    this.packageSvc.delete(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.successMessage = 'تم حذف الباقة بنجاح!';
          this.loadPackages();
        } else {
          this.errorMessage = res.message || 'فشل حذف الباقة';
        }
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف الباقة';
        console.error(err);
      }
    });
  }
}
