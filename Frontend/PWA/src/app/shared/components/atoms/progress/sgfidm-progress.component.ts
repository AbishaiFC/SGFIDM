import { Component, computed, input, model } from '@angular/core';

/**
 * SgfidmProgress — Átomo de barra de progreso.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * (según Design System SGFIDM §04.1.10):
 *   Track: 240×4px, radio 2px, fill #DBDBDB (outline-variant)
 *   Relleno determinado: 150×4px, #2A2A2A (primary)
 *   Indeterminada: sin relleno estático (animación implícita)
 *
 * Tokens: --sgfidm-color-outline-variant, --sgfidm-color-primary
 */
@Component({
  standalone: true,
  selector: 'sgfidm-progress',
  imports: [],
  templateUrl: './sgfidm-progress.component.html',
  styleUrl: './sgfidm-progress.component.scss',
})
export class SgfidmProgressComponent {
  readonly value = model<number>(0);
  readonly type = input<'determinate' | 'indeterminate'>('determinate');

  readonly fillWidth = computed(() => {
    if (this.type() === 'indeterminate') {
      return '100%';
    }
    return Math.max(0, Math.min(100, this.value())) + '%';
  });
}
