import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomePage)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services-page/services-page').then(m => m.ServicesPage)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects-page/projects-page').then(m => m.ProjectsPage)
  },
  {
    path: 'projects/:id',
    loadComponent: () => import('./pages/project-detail/project-detail').then(m => m.ProjectDetailPage)
  },
  {
    path: 'calculator',
    loadComponent: () => import('./pages/calculator-page/calculator-page').then(m => m.CalculatorPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-page/contact-page').then(m => m.ContactPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
