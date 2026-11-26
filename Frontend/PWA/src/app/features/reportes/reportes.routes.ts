import { Routes } from '@angular/router';

/** Módulo 10 — Reportes. Solo se registra REP-01 (centro de reportes, modo Solo). */
export const reportesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/reportes/reportes.component').then((m) => m.ReportesComponent),
  },
];
