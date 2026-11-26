import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SgfidmDashboardOrganismComponent, IndicatorDto } from '../../../../shared/components/organisms/dashboard/sgfidm-dashboard-organism.component';

const DEFAULT_INDICATORS: IndicatorDto[] = [
  { eyebrow: 'VENTAS DEL DÍA', value: '$6,240', delta: '+12% vs ayer' },
  { eyebrow: 'TRANSACCIONES', value: '18', delta: '+3 vs ayer' },
  { eyebrow: 'INGRESOS − GASTOS', value: '$4,210', delta: 'Ingresos $6,240 · Gastos $2,030' },
  { eyebrow: 'UTILIDAD BRUTA ESTIMADA', value: '$3,180', delta: '' },
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
  imports: [CommonModule, RouterLink, SgfidmDashboardOrganismComponent],
  selector: 'sgfidm-dashboard',
  styleUrl: './dashboard.component.scss',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  readonly indicators = DEFAULT_INDICATORS;
}
