import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
  {
    path: 'configuracion',
    loadComponent: () => import('./pages/configuracion/configuracion.component').then((m) => m.ConfiguracionComponent),
  },
  {
    path: 'configuracion/mi-perfil',
    loadComponent: () => import('./pages/mi-perfil/mi-perfil.component').then((m) => m.MiPerfilComponent),
  },
  {
    path: 'select-branch',
    loadComponent: () => import('./pages/select-branch/select-branch.component').then((m) => m.SelectBranchComponent),
  },
];
