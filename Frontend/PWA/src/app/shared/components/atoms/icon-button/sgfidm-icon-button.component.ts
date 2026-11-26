import { Component, computed, input, output } from '@angular/core';

/**
 * SgfidmIconButton — Átomo de botón de ícono.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.2):
 *   Type: standard | filled
 *   State: default | disabled
 *   Dimensión: 40×40px (hit target mínimo)
 */
@Component({
  standalone: true,
  selector: 'sgfidm-icon-button',
  imports: [],
  templateUrl: './sgfidm-icon-button.component.html',
  styleUrl: './sgfidm-icon-button.component.scss',
})
export class SgfidmIconButtonComponent {
  readonly type = input<'standard' | 'filled'>('standard');
  readonly disabled = input(false);
  readonly click = output<void>();

  readonly size = computed(() => 'var(--sgfidm-hit-target)');
  readonly radius = computed(() => 'var(--sgfidm-radius-full)');

  onClick(event: Event): void {
    // Evita el doble disparo: output `click` + burbujeo del clic nativo al host.
    event?.stopPropagation();
    if (this.disabled()) {
      event?.preventDefault();
      return;
    }
    this.click.emit();
  }
}
