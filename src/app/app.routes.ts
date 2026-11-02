import { Routes } from '@angular/router';
import { adminGuard } from './adminpanel/admin.guard';

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
    path: 'admin/login',
    loadComponent: () => import('./adminpanel/login/login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin/projects/new',
    loadComponent: () => import('./adminpanel/components/project-edit/project-edit.component').then(m => m.ProjectEditComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin/projects/edit/:id',
    loadComponent: () => import('./adminpanel/components/project-edit/project-edit.component').then(m => m.ProjectEditComponent),
    canActivate: [adminGuard]
  },
  {
    path: 'admin',
    loadComponent: () => import('./adminpanel/panel/panel.component').then(m => m.AdminPanelComponent),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

