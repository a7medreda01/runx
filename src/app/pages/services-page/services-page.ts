import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ServicesService } from '../../core/services/services.service';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './services-page.html'
})
export class ServicesPage {
  public lang = inject(LanguageService);
  public servicesService = inject(ServicesService);
}
