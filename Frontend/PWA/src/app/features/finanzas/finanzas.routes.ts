import { Routes } from '@angular/router';

/** Módulo 08 — Finanzas. Solo se registra FIN-08 (drawer, modo Solo). */
export const finanzasRoutes: Routes = [
  {
    path: 'gastos/registrar',
    loadComponent: () =>
      import('./pages/registrar-gasto/registrar-gasto.component').then(
        (m) => m.RegistrarGastoComponent,
      ),
  },
];
