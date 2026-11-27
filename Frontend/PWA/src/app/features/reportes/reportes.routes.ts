import { Routes } from '@angular/router';

/** Módulo 10 — Reportes. Solo se registra REP-01 (centro de reportes, modo Solo). */
export const reportesRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/reportes/reportes.component').then((m) => m.ReportesComponent),
  },
  {
    path: 'caja',
    loadComponent: () =>
      import('./pages/reporte-caja/reporte-caja.component').then((m) => m.ReporteCajaComponent),
  },
  {
    path: 'inventario',
    loadComponent: () =>
      import('./pages/reporte-inventario/reporte-inventario.component').then(
        (m) => m.ReporteInventarioComponent,
      ),
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./pages/reporte-ventas/reporte-ventas.component').then((m) => m.ReporteVentasComponent),
  },
];
