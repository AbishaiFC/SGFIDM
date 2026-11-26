import { Routes } from '@angular/router';

export const cajaRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/caja/caja.component').then((m) => m.CajaComponent) },
  { path: 'abrir', loadComponent: () => import('./pages/abrir-caja/abrir-caja.component').then((m) => m.AbrirCajaComponent) },
];
