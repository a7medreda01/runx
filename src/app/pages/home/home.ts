import { Component, inject, signal, computed, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { ServicesService } from '../../core/services/services.service';
import { LanguageService } from '../../core/services/language.service';
import { Project } from '../../core/models/project.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html'
})
export class HomePage implements AfterViewInit, OnDestroy {
  public lang = inject(LanguageService);
  public projectsService = inject(ProjectsService);
  public servicesService = inject(ServicesService);
  public selectedModalProject = signal<Project | null>(null);

  // Pagination & Infinite Scroll for Home Projects
  public readonly pageSize = 6;
  public visibleCount = signal<number>(6);
  public isScrollLoading = signal<boolean>(false);

  @ViewChild('projectsScrollAnchor') projectsScrollAnchor?: ElementRef<HTMLElement>;
  private scrollObserver?: IntersectionObserver;

  // Newest projects paginated
  public homeProjects = computed(() => {
    const all = this.projectsService.sortedProjects();
    return all.slice(0, this.visibleCount());
  });

  public totalProjects = computed(() => {
    return this.projectsService.sortedProjects().length;
  });

  public hasMoreProjects = computed(() => {
    return this.visibleCount() < this.totalProjects();
  });

  ngAfterViewInit(): void {
    this.setupInfiniteScroll();
  }

  ngOnDestroy(): void {
    if (this.scrollObserver) {
      this.scrollObserver.disconnect();
    }
  }

  private setupInfiniteScroll(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.scrollObserver = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target && target.isIntersecting) {
        if (this.hasMoreProjects() && !this.isScrollLoading()) {
          this.loadMore();
        }
      }
    }, {
      root: null,
      rootMargin: '250px', // Preload before reaching bottom
      threshold: 0.1
    });

    if (this.projectsScrollAnchor?.nativeElement) {
      this.scrollObserver.observe(this.projectsScrollAnchor.nativeElement);
    }
  }

  public loadMore(): void {
    if (!this.hasMoreProjects() || this.isScrollLoading()) return;

    this.isScrollLoading.set(true);
    setTimeout(() => {
      this.visibleCount.update(count => count + this.pageSize);
      this.isScrollLoading.set(false);

      if (this.projectsScrollAnchor?.nativeElement && this.scrollObserver) {
        this.scrollObserver.unobserve(this.projectsScrollAnchor.nativeElement);
        this.scrollObserver.observe(this.projectsScrollAnchor.nativeElement);
      }
    }, 350);
  }
}
