import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmBadgeComponent } from '../../molecules/../atoms/badge/sgfidm-badge.component';
import { SgfidmButtonComponent } from '../../molecules/../atoms/button/sgfidm-button.component';
import { SgfidmEmptyStateComponent } from '../../molecules/empty-state/sgfidm-empty-state.component';

/**
 * DTO para un empleado en el organismo Empleados.
 */
export interface EmpleadoDto {
  id: string;
  nombre: string;
  rol: string;
  status?: 'activo' | 'suspendido' | 'archivado';
  telefono?: string;
}

/**
 * SgfidmEmpleadosOrganism — Organismo de Empleados (Módulo 03) del Design System SGFIDM.
 *
 * Organismo de listado de empleados: PanelCard con indicadores + lista.
 * Compone PanelCard, IndicatorCard, SgfidmBadge, SgfidmButton, SgfidmEmptyState.
 *
 * Uso:
 *   <sgfidm-empleados-organism [empleados]="empleados()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-empleados-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmBadgeComponent, SgfidmButtonComponent, SgfidmEmptyStateComponent],
  templateUrl: './sgfidm-empleados-organism.component.html',
  styleUrl: './sgfidm-empleados-organism.component.scss',
})
export class SgfidmEmpleadosOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  empleados = input<EmpleadoDto[]>([]);
  /** Texto del botón de acción rápida (ej. "Agregar empleado"). */
  actionLabel = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite el empleado seleccionado con la acción (detalle/editar/suspender/archivar). */
  accion = output<{ empleado: EmpleadoDto; tipo: 'detalle' | 'editar' | 'suspender' | 'archivar' }>();
  /** Emite al registrar empleado (nuevo). */
  nuevo = output<void>();

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Total de empleados (eyebrow de IndicatorCard). */
  get totalEmpleados(): string {
    return String(this.empleados().length);
  }

  get empleadosActivos(): EmpleadoDto[] {
    return this.empleados().filter((e) => (e.status ?? 'activo') === 'activo');
  }

  get empleadosActivosCount(): string {
    return String(this.empleadosActivos.length);
  }

  get deltaActivos(): string {
    return this.empleadosActivos.length === 0 ? 'Sin empleados activos' : `${this.empleadosActivos.length} activos`;
  }
}
