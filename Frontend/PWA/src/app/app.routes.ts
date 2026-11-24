import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'pos',
    loadChildren: () => import('./features/pos/pos.routes').then((m) => m.posRoutes),
  },
  {
    path: 'caja',
    loadChildren: () => import('./features/caja/caja.routes').then((m) => m.cajaRoutes),
  },
  { path: '**', redirectTo: '/auth/login' },
];
