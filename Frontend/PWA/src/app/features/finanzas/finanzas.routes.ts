import { Routes } from '@angular/router';

/** Módulo 08 — Finanzas. Solo se registra FIN-08 (drawer, modo Solo). */
export const finanzasRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/resumen-financiero/resumen-financiero.component').then(
        (m) => m.ResumenFinancieroComponent,
      ),
  },
  {
    path: 'gastos/registrar',
    loadComponent: () =>
      import('./pages/registrar-gasto/registrar-gasto.component').then(
        (m) => m.RegistrarGastoComponent,
      ),
  },
];
