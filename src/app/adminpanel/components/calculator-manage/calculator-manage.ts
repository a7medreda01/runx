import { Component, OnInit, inject, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../Environment/environment';
import { EstimatorService } from '../../../core/services/estimator.service';

export interface ProjectTypeItem {
  id?: number;
  code: string;
  title: string;
  description: string;
  basePriceUsd: number;
  basePriceEgp: number;
  estimatedDays: number;
  icon: string;
  sortOrder: number;
}

export interface AddonItem {
  id?: number;
  code: string;
  title: string;
  description: string;
  priceUsd: number;
  priceEgp: number;
  days: number;
  category: string;
  sortOrder: number;
}

export interface EstimateSubmissionItem {
  id: number;
  estimateReference: string;
  projectType: string;
  addonsJson: string;
  timeline: string;
  estimatedPrice: number;
  estimatedDays: number;
  clientName: string;
  clientContact: string;
  createdAt: string;
}

@Component({
  selector: 'app-calculator-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator-manage.html',
  styleUrl: './calculator-manage.css'
})
export class CalculatorManageComponent implements OnInit {
  private http = inject(HttpClient);
  public estimatorSvc = inject(EstimatorService);
  private cdr = inject(ChangeDetectorRef);

  public activeTab = signal<'types' | 'addons' | 'estimates'>('types');

  // Lists
  public projectTypes = signal<ProjectTypeItem[]>([]);
  public addons = signal<AddonItem[]>([]);
  public estimates = signal<EstimateSubmissionItem[]>([]);
  public selectedEstimateForModal = signal<EstimateSubmissionItem | null>(null);
  public isLoading = signal<boolean>(false);
  public isSaving = signal<boolean>(false);

  // Forms Modal State
  public showTypeModal = signal<boolean>(false);
  public isEditingType = signal<boolean>(false);
  public typeForm: ProjectTypeItem = this.getEmptyTypeForm();

  public showAddonModal = signal<boolean>(false);
  public isEditingAddon = signal<boolean>(false);
  public addonForm: AddonItem = this.getEmptyAddonForm();

  ngOnInit(): void {
    this.loadAllData();
  }

  public loadAllData(): void {
    this.loadTypes();
    this.loadAddons();
    this.loadEstimates();
  }

  private getEmptyTypeForm(): ProjectTypeItem {
    return {
      code: '',
      title: '',
      description: '',
      basePriceUsd: 1000,
      basePriceEgp: 40000,
      estimatedDays: 10,
      icon: 'globe',
      sortOrder: 1
    };
  }

  private getEmptyAddonForm(): AddonItem {
    return {
      code: '',
      title: '',
      description: '',
      priceUsd: 300,
      priceEgp: 12000,
      days: 2,
      category: 'features',
      sortOrder: 1
    };
  }

  // --- PROJECT TYPES ---
  public loadTypes(): void {
    this.isLoading.set(true);
    this.cdr.markForCheck();
    this.http.get<any>(`${environment.apiBaseUrl}/calculator/admin/types`).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.succeeded) {
          this.projectTypes.set(res.data);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  public openTypeModal(item?: ProjectTypeItem): void {
    if (item) {
      this.isEditingType.set(true);
      this.typeForm = { ...item };
    } else {
      this.isEditingType.set(false);
      this.typeForm = this.getEmptyTypeForm();
    }
    this.showTypeModal.set(true);
    this.cdr.markForCheck();
  }

  public saveType(): void {
    if (!this.typeForm.title || this.isSaving()) return;
    this.isSaving.set(true);
    this.cdr.markForCheck();

    if (this.isEditingType() && this.typeForm.id) {
      this.http.put<any>(`${environment.apiBaseUrl}/calculator/admin/types/${this.typeForm.id}`, this.typeForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showTypeModal.set(false);
          this.loadTypes();
          this.estimatorSvc.fetchOptionsFromApi();
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSaving.set(false);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.http.post<any>(`${environment.apiBaseUrl}/calculator/admin/types`, this.typeForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showTypeModal.set(false);
          this.loadTypes();
          this.estimatorSvc.fetchOptionsFromApi();
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSaving.set(false);
          this.cdr.markForCheck();
        }
      });
    }
  }

  public deleteType(id: number): void {
    if (!confirm('هل أنت متأكد من حذف نوع المشروع هذا؟')) return;
    this.http.delete<any>(`${environment.apiBaseUrl}/calculator/admin/types/${id}`).subscribe({
      next: () => {
        this.loadTypes();
        this.estimatorSvc.fetchOptionsFromApi();
        this.cdr.markForCheck();
      }
    });
  }

  // --- ADDONS ---
  public loadAddons(): void {
    this.isLoading.set(true);
    this.cdr.markForCheck();
    this.http.get<any>(`${environment.apiBaseUrl}/calculator/admin/addons`).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.succeeded) {
          this.addons.set(res.data);
        }
        this.cdr.markForCheck();
      },
      error: () => {
        this.isLoading.set(false);
        this.cdr.markForCheck();
      }
    });
  }

  public openAddonModal(item?: AddonItem): void {
    if (item) {
      this.isEditingAddon.set(true);
      this.addonForm = { ...item };
    } else {
      this.isEditingAddon.set(false);
      this.addonForm = this.getEmptyAddonForm();
    }
    this.showAddonModal.set(true);
    this.cdr.markForCheck();
  }

  public saveAddon(): void {
    if (!this.addonForm.title || this.isSaving()) return;
    this.isSaving.set(true);
    this.cdr.markForCheck();

    if (this.isEditingAddon() && this.addonForm.id) {
      this.http.put<any>(`${environment.apiBaseUrl}/calculator/admin/addons/${this.addonForm.id}`, this.addonForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showAddonModal.set(false);
          this.loadAddons();
          this.estimatorSvc.fetchOptionsFromApi();
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSaving.set(false);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.http.post<any>(`${environment.apiBaseUrl}/calculator/admin/addons`, this.addonForm).subscribe({
        next: () => {
          this.isSaving.set(false);
          this.showAddonModal.set(false);
          this.loadAddons();
          this.estimatorSvc.fetchOptionsFromApi();
          this.cdr.markForCheck();
        },
        error: () => {
          this.isSaving.set(false);
          this.cdr.markForCheck();
        }
      });
    }
  }

  public deleteAddon(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذه الميزة الإضافية؟')) return;
    this.http.delete<any>(`${environment.apiBaseUrl}/calculator/admin/addons/${id}`).subscribe({
      next: () => {
        this.loadAddons();
        this.estimatorSvc.fetchOptionsFromApi();
        this.cdr.markForCheck();
      }
    });
  }

  // --- ESTIMATES SUBMISSIONS ---
  public loadEstimates(): void {
    this.http.get<any>(`${environment.apiBaseUrl}/calculator/admin/estimates`).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.estimates.set(res.data);
        }
        this.cdr.markForCheck();
      }
    });
  }

  public openEstimateDetails(est: EstimateSubmissionItem): void {
    this.selectedEstimateForModal.set(est);
    this.cdr.markForCheck();
  }

  public closeEstimateDetails(): void {
    this.selectedEstimateForModal.set(null);
    this.cdr.markForCheck();
  }

  public parseAddons(jsonStr: string): string[] {
    try {
      if (!jsonStr) return [];
      const parsed = JSON.parse(jsonStr);
      if (Array.isArray(parsed)) {
        return parsed.map(item => typeof item === 'string' ? item : (item.title || item.code || JSON.stringify(item)));
      }
      return [jsonStr];
    } catch {
      return jsonStr ? [jsonStr] : [];
    }
  }

  public deleteEstimate(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذا الطلب من السجل؟')) return;
    this.http.delete<any>(`${environment.apiBaseUrl}/calculator/admin/estimates/${id}`).subscribe({
      next: () => {
        this.loadEstimates();
        this.cdr.markForCheck();
      }
    });
  }
}
