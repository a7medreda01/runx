import { Component, inject, signal } from '@angular/core';
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
export class HomePage {
  public lang = inject(LanguageService);
  public projectsService = inject(ProjectsService);
  public servicesService = inject(ServicesService);
  public selectedModalProject = signal<Project | null>(null);
}
