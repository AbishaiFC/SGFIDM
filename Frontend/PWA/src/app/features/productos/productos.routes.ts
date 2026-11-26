import { Routes } from '@angular/router';

/** Módulo 04 — Productos. Solo se registra PROD-02 (modo Solo). */
export const productosRoutes: Routes = [
  {
    path: 'registrar',
    loadComponent: () =>
      import('./pages/registrar-producto/registrar-producto.component').then(
        (m) => m.RegistrarProductoComponent,
      ),
  },
];
