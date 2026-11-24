import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmBadgeComponent } from '../../molecules/../atoms/badge/sgfidm-badge.component';
import { SgfidmButtonComponent } from '../../molecules/../atoms/button/sgfidm-button.component';
import { SgfidmTabsComponent } from '../../molecules/../atoms/tabs/sgfidm-tabs.component';

/**
 * DTO para un movimiento financiero (ingreso/gasto).
 */
export interface MovimientoFincieroDto {
  id: string;
  descripcion: string;
  tipo: 'ingreso' | 'gasto';
  monto: string;
  fecha?: string;
  estado?: 'pendiente' | 'confirmado' | 'anulado';
}

/**
 * SgfidmFinanzasOrganism — Organismo de Finanzas (Módulo 08) del Design System SGFIDM.
 *
 * Organismo de resumen financiero (FIN-01): PanelCard + IndicatorCard + Tabs.
 * Anatomía: Indicadores financieros (Ingresos, Gastos, Balance) + lista de movimientos.
 * Compone PanelCard, IndicatorCard, SgfidmBadge, SgfidmButton, SgfidmTabs.
 *
 * Uso:
 *   <sgfidm-finanzas-organism [movimientos]="movimientos()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-finanzas-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmBadgeComponent, SgfidmTabsComponent],
  templateUrl: './sgfidm-finanzas-organism.component.html',
  styleUrl: './sgfidm-finanzas-organism.component.scss',
})
export class SgfidmFinanzasOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  movimientos = input<MovimientoFincieroDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite el movimiento seleccionado con la acción (detalle, anular). */
  accion = output<{ movimiento: MovimientoFincieroDto; tipo: 'detalle' | 'anular' }>();

  // ── State ──────────────────────────────────────────────────────────────────
  readonly tabs = ['ingresos', 'gastos', 'movimientos'];
  readonly tabActivo = signal<string>('movimientos');

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Total de movimientos (string para IndicatorCard). */
  get totalMovimientos(): string {
    return String(this.movimientos().length);
  }

  /** Parser de montos tipo "$1,200.50" → number. */
  private static parseMonto(monto: string): number {
    return Number(monto.replaceAll('$', '').replaceAll(',', ''));
  }

  /** Totales por tipo. */
  get ingresosTotal(): string {
    const total = this.movimientos().filter((m) => m.tipo === 'ingreso').reduce((a, b) => a + SgfidmFinanzasOrganismComponent.parseMonto(b.monto), 0);
    return total.toFixed(2);
  }
  get gastosTotal(): string {
    const total = this.movimientos().filter((m) => m.tipo === 'gasto').reduce((a, b) => a + SgfidmFinanzasOrganismComponent.parseMonto(b.monto), 0);
    return total.toFixed(2);
  }

  /** Movimientos filtrados por tab. */
  get movimientosFiltro(): MovimientoFincieroDto[] {
    const tab = this.tabActivo();
    if (tab === 'ingresos') return this.movimientos().filter((m) => m.tipo === 'ingreso');
    if (tab === 'gastos') return this.movimientos().filter((m) => m.tipo === 'gasto');
    return this.movimientos();
  }

  onTab(tab: string): void {
    this.tabActivo.set(tab);
  }

  onAccion(m: MovimientoFincieroDto, tipo: 'detalle' | 'anular'): void {
    this.accion.emit({ movimiento: m, tipo });
  }
}
