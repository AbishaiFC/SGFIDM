import { SgfidmIconComponent } from './../../atoms/icon/sgfidm-icon.component';
import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmNotification — Molécula de notification/toast del Design System SGFIDM.
 *
 * COMPONENT_SET 195:2794 con 4 variantes: alta | media | baja | exito.
 * Anatomía común (Figma): barra de acento 4×46 px a la izquierda + bloque de contenido.
 * Anatomía: eyebrow CAPS 10 px text-muted · mensaje 13 px text-primary.
 * Decisión impresa: "solo accionable, prioridad Alta/Media/Baja/Éxito".
 *
 * Uso:
 *   <sgfidm-notification variant="alta" message="Caja con diferencia en el cierre (-$120.)" (detail)="openDetail()" />
 */
@Component({
  selector: 'sgfidm-notification',
  standalone: true,
  imports: [SgfidmIconComponent, CommonModule],
  templateUrl: './sgfidm-notification.component.html',
  styleUrl: './sgfidm-notification.component.scss',
})
export class SgfidmNotificationComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  variant = input<'alta' | 'media' | 'baja' | 'exito'>('alta');
  eyebrow = input<string>('');
  message = input<string>('');
  detailLabel = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  detail = output<void>();
  close = output<void>();

  /** Accent color según variante (código de Figma per variante). */
  readonly accent = computed<string>(() => {
    switch (this.variant()) {
      case 'alta': return 'var(--sgfidm-color-error, #a9442e)';
      case 'media': return 'var(--sgfidm-color-warning, #8a6414)';
      case 'baja': return 'var(--sgfidm-color-info, #33566e)';
      case 'exito': return 'var(--sgfidm-color-success, #3e6b4f)';
    }
  });

  /** Eyebrow impreso por variante cuando no hay override explícito. */
  readonly eyebrowText = computed<string>(() => {
    if (this.eyebrow()) return this.eyebrow();
    return {
      alta: 'PRIORIDAD ALTA',
      media: 'PRIORIDAD MEDIA',
      baja: 'PRIORIDAD BAJA',
      exito: 'ÉXITO',
    }[this.variant()];
  });

  onDetail(): void { this.detail.emit(); }
  onClose(): void { this.close.emit(); }
}
