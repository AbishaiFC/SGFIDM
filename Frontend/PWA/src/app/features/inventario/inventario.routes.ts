import { Routes } from '@angular/router';

/** Módulo 05 — Inventario. Solo se registra INV-01 (existencias generales). */
export const inventarioRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inventario/inventario.component').then((m) => m.InventarioComponent),
  },
];
