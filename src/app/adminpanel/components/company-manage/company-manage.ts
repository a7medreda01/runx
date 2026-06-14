import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../../../Services/company.service';
import { Company, CompanyUpdateForm } from '../../../Models/api.models';

@Component({
  selector: 'app-company-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-manage.html',
  styleUrl: './company-manage.css'
})
export class CompanyManageComponent implements OnInit {
  company: Company | null = null;
  isLoading = false;
  isSaving = false;
  successMessage = '';
  errorMessage = '';

  // Form bindings
  name = '';
  about = '';
  vision = '';
  mission = '';
  yearsOfExperience = 0;
  
  selectedLogo: File | null = null;
  selectedCover: File | null = null;
  logoPreview: string | null = null;
  coverPreview: string | null = null;

  constructor(private companySvc: CompanyService) {}

  ngOnInit(): void {
    this.loadCompany();
  }

  loadCompany(): void {
    this.isLoading = true;
    this.companySvc.getAll().subscribe({
      next: (res) => {
        if (res.succeeded && res.data && res.data.length > 0) {
          this.company = res.data[0];
          this.name = this.company.name;
          this.about = this.company.about || '';
          this.vision = this.company.vision || '';
          this.mission = this.company.mission || '';
          this.yearsOfExperience = this.company.yearsOfExperience || 0;
          this.logoPreview = this.company.logo;
          this.coverPreview = this.company.coverImage;
        } else {
          this.errorMessage = 'لم يتم العثور على بيانات الشركة';
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل بيانات الشركة';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onLogoSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedLogo = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.logoPreview = e.target.result;
      reader.readAsDataURL(file);
    }
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

  onSubmit(): void {
    if (!this.company) return;

    this.isSaving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const form: CompanyUpdateForm = {
      Name: this.name,
      About: this.about,
      Vision: this.vision,
      Mission: this.mission,
      YearsOfExperience: this.yearsOfExperience
    };

    if (this.selectedLogo) form.Logo = this.selectedLogo;
    if (this.selectedCover) form.CoverImage = this.selectedCover;

    this.companySvc.update(this.company.id, form).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.successMessage = 'تم تحديث بيانات الشركة بنجاح!';
          this.company = res.data;
          this.selectedLogo = null;
          this.selectedCover = null;
        } else {
          this.errorMessage = res.message || 'فشل التحديث';
        }
        this.isSaving = false;
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حفظ التغييرات';
        this.isSaving = false;
        console.error(err);
      }
    });
  }
}
