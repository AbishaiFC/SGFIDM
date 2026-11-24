import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmIndicatorCard — Molécula de tarjeta de indicador del Design System SGFIDM.
 *
 * Tarjeta metálica pequeña (268×120 px) para métricas del dashboard.
 * Anatomía: eyebrow (label muy pequeño), dato principal y delta secundario.
 * Sin icono en el lienzo (verificado en Figma `SGFIDM/Indicator card` 195:2705).
 *
 * Uso:
 *   <sgfidm-indicator-card eyebrow="VENTAS DEL DÍA" value="$4,820.50" delta="▲ 12% vs. ayer · 17 ventas" />
 */
@Component({
  selector: 'sgfidm-indicator-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-indicator-card.component.html',
  styleUrl: './sgfidm-indicator-card.component.scss',
})
export class SgfidmIndicatorCardComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  eyebrow = input.required<string>();
  value = input.required<string>();
  delta = input<string>('');
}
