import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';

/**
 * DTO para una sucursal en el organismo Sucursal.
 */
export interface SucursalDto {
  id: string;
  nombre: string;
  direccion?: string;
  telefono?: string;
  status?: 'activa' | 'archivada' | 'inactiva';
}

/**
 * SgfidmSucursalOrganism — Organismo de Sucursales (Módulo 02) del Design System SGFIDM.
 *
 * Organismo de listado de sucursales: PanelCard con lista + IndicatorCard de totales.
 * Compone PanelCard, IndicatorCard, SgfidmButton, SgfidmTabs.
 *
 * Uso:
 *   <sgfidm-sucursal-organism [sucursales]="sucursales()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-sucursal-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent],
  templateUrl: './sgfidm-sucursal-organism.component.html',
  styleUrl: './sgfidm-sucursal-organism.component.scss',
})
export class SgfidmSucursalOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  sucursales = input<SucursalDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite la sucursal seleccionada con la acción a ejecutar (detalle, editar, archivar, reactivar). */
  accion = output<{ sucursal: SucursalDto; tipo: 'detalle' | 'editar' | 'archivar' | 'reactivar' }>();

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Total de sucursales (eyebrow de IndicatorCard). */
  get totalSucursales(): string {
    return String(this.sucursales().length);
  }

  /** Sucursales activas. */
  get sucursalesActivas(): SucursalDto[] {
    return this.sucursales().filter((s) => (s.status ?? 'activa') === 'activa');
  }

  /** Getters para plantilla (valores string). */
  get activasCount(): string {
    return String(this.sucursalesActivas.length);
  }
  get deltaActivas(): string {
    return this.sucursalesActivas.length === 1 ? '1 activa' : `${this.sucursalesActivas.length} activas`;
  }
}
