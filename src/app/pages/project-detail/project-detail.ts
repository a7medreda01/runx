import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { Project } from '../../core/models/project.model';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.html'
})
export class ProjectDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private projectsService = inject(ProjectsService);
  public lang = inject(LanguageService);

  constructor() {
    effect(() => {
      const currentLang = this.lang.currentLang();
      const params = this.route.snapshot.params;
      const id = params['id'];
      if (id) {
        const found = this.projectsService.getProjectById(id);
        if (found) {
          this.project.set(found);
        }
      }
    });
  }

  public project = signal<Project | null>(null);
  public isLoading = signal<boolean>(true);
  public activeImageIndex = signal<number>(0);
  public lightboxOpen = signal<boolean>(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProject(id);
      } else {
        this.isLoading.set(false);
      }
    });
  }

  private loadProject(id: string) {
    this.isLoading.set(true);
    const found = this.projectsService.getProjectById(id);
    if (found) {
      this.project.set(found);
    }
    this.isLoading.set(false);
    this.activeImageIndex.set(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public gallery(): string[] {
    const proj = this.project();
    if (!proj) return [];
    if (proj.galleryImages && proj.galleryImages.length > 0) {
      return proj.galleryImages;
    }
    return [proj.imageUrl];
  }

  public activeImage(): string {
    const gal = this.gallery();
    const idx = this.activeImageIndex();
    return gal[idx] || gal[0] || '';
  }

  public openLightbox(index: number) {
    this.activeImageIndex.set(index);
    this.lightboxOpen.set(true);
  }

  public closeLightbox() {
    this.lightboxOpen.set(false);
  }

  public nextImage() {
    const total = this.gallery().length;
    this.activeImageIndex.update(idx => (idx + 1) % total);
  }

  public prevImage() {
    const total = this.gallery().length;
    this.activeImageIndex.update(idx => (idx - 1 + total) % total);
  }
}
