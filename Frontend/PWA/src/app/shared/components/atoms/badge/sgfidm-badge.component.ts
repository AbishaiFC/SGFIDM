import { Component, computed, input } from '@angular/core';

/**
 * SgfidmBadge — Átomo de insignia/badge.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.11):
 *   Variant: neutral | alta — error | media — warning | baja — info | exito
 *   Alto: 20px, radio 10px (radius-lg), texto blanco CAPS
 *
 * Tokens: --sgfidm-color-inverse-surface, --sgfidm-color-error, --sgfidm-color-warning,
 *         --sgfidm-color-info, --sgfidm-color-success, --sgfidm-color-on-primary,
 *         --sgfidm-radius-lg
 */
@Component({
  standalone: true,
  selector: 'sgfidm-badge',
  imports: [],
  templateUrl: './sgfidm-badge.component.html',
  styleUrl: './sgfidm-badge.component.scss',
})
export class SgfidmBadgeComponent {
  readonly variant = input<'neutral' | 'error' | 'warning' | 'info' | 'success'>('neutral');

  readonly fillColor = computed(() => {
    const map: Record<string, string> = {
      neutral: 'var(--sgfidm-color-inverse-surface)',
      error: 'var(--sgfidm-color-error)',
      warning: 'var(--sgfidm-color-warning)',
      info: 'var(--sgfidm-color-info)',
      success: 'var(--sgfidm-color-success)',
    };
    return map[this.variant()] ?? map['neutral'];
  });

  readonly textColor = computed(() => 'var(--sgfidm-color-on-primary)');
}
