import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmNotificationComponent } from '../../molecules/notification/sgfidm-notification.component';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmBadgeComponent } from '../../molecules/../atoms/badge/sgfidm-badge.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';

/**
 * DTO para una alerta operativa.
 */
export interface AlertaDto {
  id: string;
  estado: 'alta' | 'media' | 'baja' | 'exito';
  mensaje: string;
  href?: string;
  readonly?: boolean;
}

/**
 * SgfidmAlertasOrganism — Organismo de Alertas y notificaciones (Módulo 09) del Design System SGFIDM.
 *
 * Organismo de alertas: listado de Notifications (4 variantes) en un PanelCard.
 * Anatomía (módulo 09): alertas operativas requieren acción inmediata (prioridad Alta/Media).
 *
 * Uso:
 *   <sgfidm-alertas-organism [alertas]="alertas()" (detalle)="onDetalle($event)" />
 */
@Component({
  selector: 'sgfidm-alertas-organism',
  standalone: true,
  imports: [CommonModule, SgfidmNotificationComponent, SgfidmPanelCardComponent, SgfidmBadgeComponent, SgfidmIndicatorCardComponent],
  templateUrl: './sgfidm-alertas-organism.component.html',
  styleUrl: './sgfidm-alertas-organism.component.scss',
})
export class SgfidmAlertasOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  alertas = input<AlertaDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite la alerta seleccionada para detalle. */
  detalle = output<AlertaDto>();

  /** Alertas por prioridad (para IndicatorCard de warning level). */
  get alertasAltas(): AlertaDto[] {
    return this.alertas().filter((a) => a.estado === 'alta' || a.estado === 'media');
  }

  /** Getters para plantilla. */
  get totalAlertas(): string {
    return String(this.alertas().length);
  }
  get altasCount(): string {
    return String(this.alertasAltas.length);
  }
  get altasDelta(): string {
    return this.alertasAltas.length === 0 ? 'Sin críticas' : `${this.alertasAltas.length} requieren acción`;
  }

  /** Badge variant para una alerta. */
  badgeVariant(a: AlertaDto): 'error' | 'warning' | 'info' | 'success' | 'neutral' {
    const map: Record<AlertaDto['estado'], 'error' | 'warning' | 'info' | 'success' | 'neutral'> = {
      alta: 'error',
      media: 'warning',
      baja: 'info',
      exito: 'success',
    };
    return map[a.estado];
  }

  onDetalle(a: AlertaDto): void {
    this.detalle.emit(a);
  }
}
