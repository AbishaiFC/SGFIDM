import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface ReporteCard {
  id: string;
  titulo: string;
  descripcion: string;
}

/**
 * REP-01 — Reportes: Centro de reportes (Módulo 10), modo Solo (Figma 1145:86225).
 *
 * Los reportes son de solo consulta (spec §12.2). Las tarjetas usan PanelCard
 * (molécula) y el botón de encabezado usa Button (átomo, sin envoltorio superior).
 *
 * ToDo: REP-02..05 (pantallas de cada reporte) y REP-06 (historial de exportaciones).
 * OTROS MODOS: reports.view / reports.export por rol; en Sucursales el reporte de
 * inventario respeta la sucursal activa.
 */
@Component({
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-reportes',
  styleUrl: './reportes.component.scss',
  templateUrl: './reportes.component.html',
})
export class ReportesComponent {
  private readonly router = inject(Router);

  readonly reportes: ReporteCard[] = [
    {
      id: 'REP-02',
      titulo: 'Ventas',
      descripcion: 'Análisis de ventas por periodo, producto y método de pago.',
    },
    {
      id: 'REP-03',
      titulo: 'Inventario',
      descripcion: 'Existencias, movimientos y ajustes por producto.',
    },
    {
      id: 'REP-04',
      titulo: 'Caja',
      descripcion: 'Sesiones, movimientos, cierres y diferencias de efectivo.',
    },
    {
      id: 'REP-05',
      titulo: 'Finanzas',
      descripcion: 'Ingresos, gastos, utilidad y flujo de efectivo.',
    },
  ];

  readonly aviso = signal('');

  abrir(id: string): void {
    const rutas: Record<string, string> = { 'REP-02': '/reportes/ventas' };
    if (rutas[id]) {
      this.router.navigate([rutas[id]]);
      return;
    }
    this.aviso.set(`ToDo ${id}: reporte pendiente de implementar.`);
  }

  historial(): void {
    // ToDo REP-06: historial de exportaciones.
  }

  irAlInicio(): void {
    this.router.navigate(['/dashboard']);
  }
}
