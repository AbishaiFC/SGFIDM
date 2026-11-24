import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmBadgeComponent } from '../../molecules/../atoms/badge/sgfidm-badge.component';
import { SgfidmButtonComponent } from '../../molecules/../atoms/button/sgfidm-button.component';
import { SgfidmSwitchComponent } from '../../molecules/../atoms/switch/sgfidm-switch.component';

/**
 * DTO para un parámetro de seguridad (CONF-04).
 */
export interface SeguridadParamDto {
  id: string;
  nombre: string;
  descripcion: string;
  valorActual: string;
  enabled: boolean;
}

/**
 * SgfidmSeguridadOrganism — Organismo de Seguridad (CONF-04 Configuración — Seguridad) del Design System SGFIDM.
 *
 * Organismo de seguridad: PanelCard + IndicatorCard + Switch + Badge + Button.
 * Anatomía (§13): "Cambiar seguridad no afecta retroactivamente", parámetros con valores por defecto sensatos.
 *
 * Uso:
 *   <sgfidm-seguridad-organism [params]="params()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-seguridad-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmBadgeComponent, SgfidmButtonComponent, SgfidmSwitchComponent],
  templateUrl: './sgfidm-seguridad-organism.component.html',
  styleUrl: './sgfidm-seguridad-organism.component.scss',
})
export class SgfidmSeguridadOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  params = input<SeguridadParamDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite el parámetro con la acción: toggle o detalle. */
  accion = output<{ param: SeguridadParamDto; accion: 'toggle' | 'detalle' }>();

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Total de parámetros. */
  get totalParams(): string {
    return String(this.params().length);
  }

  /** Parámetros habilitados. */
  get enabledCount(): number {
    return this.params().filter((p) => p.enabled).length;
  }

  get enabledCountStr(): string {
    return String(this.enabledCount);
  }

  onToggle(param: SeguridadParamDto): void {
    this.accion.emit({ param, accion: 'toggle' });
  }

  onDetail(param: SeguridadParamDto): void {
    this.accion.emit({ param, accion: 'detalle' });
  }
}
