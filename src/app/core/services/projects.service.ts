import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from './language.service';
import { Project } from '../models/project.model';
import { INITIAL_PROJECTS } from './data/initial-projects.data';
import { ApiService } from './api.service';
import { catchError, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private http = inject(HttpClient);
  private apiService = inject(ApiService);
  private languageService = inject(LanguageService);

  private projectsSignal = signal<Project[]>([]);
  public selectedCategory = signal<string>('all');
  public searchQuery = signal<string>('');
  public isLoading = signal<boolean>(false);

  public filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const all = this.projectsSignal();
    return all.filter(p => {
      const matchCat = category === 'all' || p.category === category;
      const matchQuery = !query || 
        p.title.toLowerCase().includes(query) ||
        p.summary.toLowerCase().includes(query) ||
        p.client.toLowerCase().includes(query) ||
        p.technologies.some(t => t.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  });

  public sortedProjects = computed(() => {
    const list = [...this.projectsSignal()];
    return list.sort((a, b) => {
      const dateA = a.executionDate ? new Date(a.executionDate).getTime() : (a.year ? parseInt(a.year, 10) * 10000 : 0);
      const dateB = b.executionDate ? new Date(b.executionDate).getTime() : (b.year ? parseInt(b.year, 10) * 10000 : 0);
      if (dateB !== dateA) return dateB - dateA;
      const numA = parseInt(a.id.toString().replace(/\D/g, '') || '0', 10);
      const numB = parseInt(b.id.toString().replace(/\D/g, '') || '0', 10);
      return numB - numA;
    });
  });

  public featuredProjects = computed(() => {
    return this.sortedProjects().filter(p => p.featured);
  });

  constructor() {
    effect(() => {
      const lang = this.languageService.currentLang();
      this.fetchProjectsFromApi();
    });
  }

  public fetchProjectsFromApi(): void {
    this.isLoading.set(true);
    this.apiService.getProjects().pipe(
      tap(projects => {
        if (projects && projects.length > 0) {
          this.projectsSignal.set(projects);
        } else {
          this.projectsSignal.set(INITIAL_PROJECTS);
        }
        this.isLoading.set(false);
      }),
      catchError(() => {
        this.projectsSignal.set(INITIAL_PROJECTS);
        this.isLoading.set(false);
        return of(INITIAL_PROJECTS);
      })
    ).subscribe();
  }

  public getProjectById(id: string): Project | undefined {
    const cleanId = id.trim();
    return this.projectsSignal().find(p => 
      p.id === cleanId || 
      p.id === 'proj-' + cleanId || 
      p.id.replace('proj-', '') === cleanId
    );
  }
}
