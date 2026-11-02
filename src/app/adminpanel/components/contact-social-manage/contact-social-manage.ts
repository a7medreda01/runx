import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../Services/company.service';
import { ContactInfoService } from '../../../Services/contact-info.service';
import { SocialMediaService } from '../../../Services/social-media.service';
import { ContactInfo, ContactInfoRequest, SocialMedia, SocialMediaRequest } from '../../../Models/api.models';

@Component({
  selector: 'app-contact-social-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-social-manage.html',
  styleUrl: './contact-social-manage.css'
})
export class ContactSocialManageComponent implements OnInit {
  // Contact Info state
  contactInfo: ContactInfo | null = null;
  companyId = 1; // Default fallback
  isLoadingContact = false;
  isSavingContact = false;
  contactSuccess = '';
  contactError = '';

  // Contact fields bindings
  phone = '';
  whatsApp = '';
  email = '';
  address = '';
  googleMapUrl = '';

  // Social Media state
  socialLinks: SocialMedia[] = [];
  isLoadingSocial = false;
  socialSuccess = '';
  socialError = '';

  // Social form modal bindings
  isSocialFormOpen = false;
  isSavingSocial = false;
  socialFormTitle = 'إضافة رابط تواصل اجتماعي';
  editingSocialId: number | null = null;
  socialPlatform = '';
  socialUrl = '';

  constructor(
    private companySvc: CompanyService,
    private contactInfoSvc: ContactInfoService,
    private socialMediaSvc: SocialMediaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadContactInfo();
    this.loadSocialMedia();
  }

  loadContactInfo(): void {
    this.isLoadingContact = true;
    this.cdr.markForCheck();
    this.companySvc.getAll().subscribe({
      next: (res) => {
        if (res.succeeded && res.data && res.data.length > 0) {
          const comp = res.data[0];
          this.companyId = comp.id;
          if (comp.contactInfo) {
            this.contactInfo = comp.contactInfo;
            this.phone = this.contactInfo.phone || '';
            this.whatsApp = this.contactInfo.whatsApp || '';
            this.email = this.contactInfo.email || '';
            this.address = this.contactInfo.address || '';
            this.googleMapUrl = this.contactInfo.googleMapUrl || '';
          }
        }
        this.isLoadingContact = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.contactError = 'فشل تحميل بيانات الاتصال';
        this.isLoadingContact = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  loadSocialMedia(): void {
    this.isLoadingSocial = true;
    this.cdr.markForCheck();
    this.socialMediaSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.socialLinks = res.data.items;
        }
        this.isLoadingSocial = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.socialError = 'فشل تحميل روابط التواصل الاجتماعي';
        this.isLoadingSocial = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  onSubmitContact(): void {
    if (this.isSavingContact) return;

    this.isSavingContact = true;
    this.contactSuccess = '';
    this.contactError = '';
    this.cdr.markForCheck();

    if (!this.contactInfo) {
      // If contactInfo doesn't exist, create it
      const body: ContactInfoRequest = {
        id: 0,
        phone: this.phone,
        whatsApp: this.whatsApp,
        email: this.email,
        address: this.address,
        googleMapUrl: this.googleMapUrl,
        companyId: this.companyId
      };
      this.contactInfoSvc.create(body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.contactSuccess = 'تم حفظ بيانات الاتصال بنجاح!';
            this.contactInfo = res.data;
          } else {
            this.contactError = res.message || 'فشل الحفظ';
          }
          this.isSavingContact = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.contactError = 'حدث خطأ أثناء حفظ البيانات';
          this.isSavingContact = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
      return;
    }

    const requestBody: ContactInfoRequest = {
      id: this.contactInfo.id,
      phone: this.phone,
      whatsApp: this.whatsApp,
      email: this.email,
      address: this.address,
      googleMapUrl: this.googleMapUrl,
      companyId: this.contactInfo.companyId
    };

    this.contactInfoSvc.update(this.contactInfo.id, requestBody).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.contactSuccess = 'تم تحديث بيانات الاتصال بنجاح!';
          this.contactInfo = res.data;
        } else {
          this.contactError = res.message || 'فشل تحديث البيانات';
        }
        this.isSavingContact = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.contactError = 'حدث خطأ أثناء تحديث البيانات';
        this.isSavingContact = false;
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }

  // Social Media CRUD operations
  openAddSocial(): void {
    this.editingSocialId = null;
    this.socialPlatform = '';
    this.socialUrl = '';
    this.socialFormTitle = 'إضافة رابط تواصل اجتماعي';
    this.isSocialFormOpen = true;
    this.socialSuccess = '';
    this.socialError = '';
    this.cdr.markForCheck();
  }

  openEditSocial(social: SocialMedia): void {
    this.editingSocialId = social.id;
    this.socialPlatform = social.platform;
    this.socialUrl = social.url;
    this.socialFormTitle = 'تعديل رابط التواصل';
    this.isSocialFormOpen = true;
    this.socialSuccess = '';
    this.socialError = '';
    this.cdr.markForCheck();
  }

  closeSocialForm(): void {
    this.isSocialFormOpen = false;
    this.cdr.markForCheck();
  }

  onSubmitSocial(): void {
    if (!this.socialPlatform || !this.socialUrl || this.isSavingSocial) return;

    this.isSavingSocial = true;
    this.socialSuccess = '';
    this.socialError = '';
    this.cdr.markForCheck();

    const body: SocialMediaRequest = {
      id: this.editingSocialId || 0,
      platform: this.socialPlatform,
      url: this.socialUrl,
      companyId: this.companyId
    };

    if (this.editingSocialId) {
      this.socialMediaSvc.update(this.editingSocialId, body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.socialSuccess = 'تم تعديل الرابط بنجاح!';
            this.loadSocialMedia();
            this.closeSocialForm();
          } else {
            this.socialError = res.message || 'فشل التعديل';
          }
          this.isSavingSocial = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.socialError = 'حدث خطأ أثناء تعديل الرابط';
          this.isSavingSocial = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.socialMediaSvc.create(body).subscribe({
        next: (res) => {
          if (res.succeeded) {
            this.socialSuccess = 'تمت إضافة الرابط بنجاح!';
            this.loadSocialMedia();
            this.closeSocialForm();
          } else {
            this.socialError = res.message || 'فشل الإضافة';
          }
          this.isSavingSocial = false;
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.socialError = 'حدث خطأ أثناء إضافة الرابط';
          this.isSavingSocial = false;
          console.error(err);
          this.cdr.markForCheck();
        }
      });
    }
  }

  deleteSocial(id: number): void {
    if (!confirm('هل تريد حذف رابط التواصل هذا؟')) {
      return;
    }

    this.socialSuccess = '';
    this.socialError = '';
    this.cdr.markForCheck();

    this.socialMediaSvc.delete(id).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.socialSuccess = 'تم حذف الرابط بنجاح!';
          this.loadSocialMedia();
        } else {
          this.socialError = res.message || 'فشل حذف الرابط';
        }
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.socialError = 'حدث خطأ أثناء حذف الرابط';
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }
}
