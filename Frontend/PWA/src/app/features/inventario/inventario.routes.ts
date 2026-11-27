import { Routes } from '@angular/router';

/** Módulo 05 — Inventario. Solo se registra INV-01 (existencias generales). */
export const inventarioRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/inventario/inventario.component').then((m) => m.InventarioComponent),
  },
  {
    path: 'movimientos/registrar',
    loadComponent: () =>
      import('./pages/registrar-movimiento/registrar-movimiento.component').then(
        (m) => m.RegistrarMovimientoComponent,
      ),
  },
  {
    path: ':codigo',
    loadComponent: () =>
      import('./pages/detalle-existencias/detalle-existencias.component').then(
        (m) => m.DetalleExistenciasComponent,
      ),
  },
];
