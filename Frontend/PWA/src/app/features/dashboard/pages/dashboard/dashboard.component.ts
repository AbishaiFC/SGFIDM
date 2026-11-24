import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmDashboardOrganismComponent, IndicatorDto } from '../../../../shared/components/organisms/dashboard/sgfidm-dashboard-organism.component';

const DEFAULT_INDICATORS: IndicatorDto[] = [
  { eyebrow: 'VENTAS DEL DÍA', value: '$ 0.00', delta: 'Sin ventas registradas hoy' },
  { eyebrow: 'ESTADO DE CAJA', value: 'Cerrada', delta: 'Abre una caja para operar' },
  { eyebrow: 'PRODUCTOS', value: '0', delta: 'Catálogo vacío' },
  { eyebrow: 'TRANSACCIONES', value: '0', delta: 'Sin actividad' },
];

/**
 * DashboardPage — Plantilla del Dashboard Operativo del Design System SGFIDM.
 *
 * Plantilla (template): compone el organismo DashboardOrganism y pasa
 * los indicadores por defecto del negocio (Ventas del día, Estado de caja,
 * Productos, Transacciones) como IndicatorDto[].
 *
 * Uso:
 *   <sgfidm-dashboard />
 */
@Component({
  standalone: true,
  imports: [CommonModule, SgfidmDashboardOrganismComponent],
  selector: 'sgfidm-dashboard',
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly indicators = DEFAULT_INDICATORS;
}
