import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../../Services/project.service';
import { ServiceCategoryService } from '../../../Services/service-category.service';
import { Project, ServiceCategory } from '../../../Models/api.models';

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

  constructor(
    private projectSvc: ProjectService,
    private categorySvc: ServiceCategoryService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadCategories();
  }

  loadProjects(): void {
    this.isLoading = true;
    this.cdr.markForCheck();
    this.projectSvc.getAll({ PageSize: 100 }).subscribe({
      next: (res) => {
        if (res.succeeded) {
          this.projects = res.data.items;
        } else {
          this.errorMessage = res.message || 'فشل تحميل المشاريع';
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء تحميل المشاريع';
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
        console.error('Error loading categories', err);
        this.cdr.markForCheck();
      }
    });
  }

  openAddForm(): void {
    this.router.navigate(['/admin/projects/new']);
  }

  openEditForm(proj: Project): void {
    this.router.navigate(['/admin/projects/edit', proj.id]);
  }

  deleteProject(id: number): void {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع نهائياً؟')) {
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
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'حدث خطأ أثناء حذف المشروع';
        console.error(err);
        this.cdr.markForCheck();
      }
    });
  }
}
