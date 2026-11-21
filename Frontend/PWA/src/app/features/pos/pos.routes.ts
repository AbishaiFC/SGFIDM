import { Routes } from '@angular/router';

export const posRoutes: Routes = [
  { path: '', loadComponent: () => import('./pages/pos-terminal/pos-terminal.component').then((m) => m.PosTerminalComponent) },
];
