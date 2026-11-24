import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';

/**
 * DTO para indicadores del dashboard (unifica la interfaz de datos).
 */
export interface IndicatorDto {
  eyebrow: string;
  value: string;
  delta: string;
}

/**
 * SgfidmDashboardOrganism — Organismo del Dashboard del Design System SGFIDM.
 *
 * Compone un grid de IndicatorCards — organismo de composición en la sección "Dashboard Operativo".
 * Anatomía: grid de indicadores organizados en un organismo coherente para la visualización de datos del negocio.
 *
 * Uso:
 *   <sgfidm-dashboard-organism [indicators]="[
 *     { eyebrow: 'VENTAS DEL DÍA', value: '$ 1,200.00', delta: 'Hoy' }
 *   ]" />
 */
@Component({
  selector: 'sgfidm-dashboard-organism',
  standalone: true,
  imports: [CommonModule, SgfidmIndicatorCardComponent],
  templateUrl: './sgfidm-dashboard-organism.component.html',
  styleUrl: './sgfidm-dashboard-organism.component.scss',
})
export class SgfidmDashboardOrganismComponent {
  indicators = input<IndicatorDto[]>([]);
}
