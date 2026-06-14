import { Routes } from '@angular/router';
import { LandingComponent } from './Feautures/landing-component/landing-component';
import { AdminLoginComponent } from './adminpanel/login/login.component';
import { AdminPanelComponent } from './adminpanel/panel/panel.component';
import { adminGuard } from './adminpanel/admin.guard';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin', component: AdminPanelComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];

