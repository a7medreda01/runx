import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../core/services/projects.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './projects-page.html'
})
export class ProjectsPage {
  public lang = inject(LanguageService);
  public projectsService = inject(ProjectsService);
}
