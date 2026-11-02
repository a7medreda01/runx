import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SiteSettingService } from '../../../Services/site-setting.service';
import { SiteSetting, SiteSettingRequest } from '../../../Models/api.models';

@Component({
  selector: 'app-site-setting-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './site-setting-manage.html',
  styleUrl: './site-setting-manage.css'
})
export class SiteSettingManageComponent implements OnInit {
  settings: SiteSetting[] = [];
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  // Form states
  isFormOpen = false;
  isSaving = false;
  formTitle = 'إضافة إعداد جديد';
  
  // Model bindings
  editingId: number | null = null;
  settingKey = '';
  settingValue = '';

  constructor(
    private settingSvc: SiteSettingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadSettings();
  }

  loadSettings(): void {
    this.isLoading = true;
    this.cdr.markForCheck();
    this.settingSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.settings = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل الإعدادات';
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل الإعدادات';
        this.isLoading = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  openAddForm(): void {
    this.editingId = null;
    this.settingKey = '';
    this.settingValue = '';
    this.formTitle = 'إضافة إعداد جديد';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  openEditForm(sett: SiteSetting): void {
    this.editingId = sett.id;
    this.settingKey = sett.key;
    this.settingValue = sett.value || '';
    this.formTitle = 'تعديل الإعداد';
    this.isFormOpen = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();
  }

  closeForm(): void {
    this.isFormOpen = false;
    this.cdr.markForCheck();
  }

  onSubmit(): void {
    if (!this.settingKey || !this.settingValue || this.isSaving) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';
    this.cdr.markForCheck();

    const body: SiteSettingRequest = {
      id: this.editingId || 0,
      key: this.settingKey,
      value: this.settingValue
    };

    if (this.editingId) {
      // Edit
      this.settingSvc.update(this.editingId, body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تم تعديل الإعداد بنجاح!';
            this.loadSettings();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل تعديل الإعداد';
          }
          this.isSaving = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء تعديل الإعداد';
          this.isSaving = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    } else {
      // Add
      this.settingSvc.create(body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.successMessage = 'تمت إضافة الإعداد بنجاح!';
            this.loadSettings();
            this.closeForm();
          } else {
            this.errorMessage = res.message || 'فشل إضافة الإعداد';
          }
          this.isSaving = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.errorMessage = 'حدث خطأ أثناء إضافة الإعداد';
          this.isSaving = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    }
  }

  deleteSetting(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذا الإعداد؟ قد يؤثر ذلك على عمل بعض أجزاء الموقع.')) {
      return;
    }

    this.settingSvc.delete(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.successMessage = 'تم حذف الإعداد بنجاح!';
          this.loadSettings();
        } else {
          this.errorMessage = res.message || 'فشل حذف الإعداد';
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف الإعداد';
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }
}
