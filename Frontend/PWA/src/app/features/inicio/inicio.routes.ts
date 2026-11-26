import { Routes } from '@angular/router';

export const inicioRoutes: Routes = [
  { path: '', redirectTo: 'configurar', pathMatch: 'full' },
  {
    path: 'configurar',
    loadComponent: () =>
      import('./pages/bienvenida-configuracion/bienvenida-configuracion.component').then(
        (m) => m.BienvenidaConfiguracionComponent,
      ),
  },
  {
    path: 'primeros-pasos',
    loadComponent: () =>
      import('./pages/primeros-pasos/primeros-pasos.component').then((m) => m.PrimerosPasosComponent),
  },
];
