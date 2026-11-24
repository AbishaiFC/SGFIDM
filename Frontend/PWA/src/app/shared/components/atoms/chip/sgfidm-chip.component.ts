import { Component, computed, input, model, output } from '@angular/core';

/**
 * SgfidmChip — Átomo de chip/etiqueta.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.6):
 *   Variant: filter | category | status
 *   State: default | selected
 *   Alto: 28px, radio 14px, padding 0 12px, gap 6px
 *
 * Tokens: --sgfidm-color-primary, --sgfidm-color-surface, --sgfidm-color-outline,
 *         --sgfidm-color-text-primary, --sgfidm-color-on-primary, --sgfidm-color-text-secondary
 */
@Component({
  standalone: true,
  selector: 'sgfidm-chip',
  imports: [],
  templateUrl: './sgfidm-chip.component.html',
  styleUrl: './sgfidm-chip.component.scss',
})
export class SgfidmChipComponent {
  readonly variant = input<'filter' | 'category' | 'status'>('filter');
  readonly selected = model<boolean>(false);
  readonly disabled = input(false);
  readonly click = output<void>();

  readonly isSelected = computed(() => this.selected());
  readonly isDisabled = computed(() => this.disabled());

  onClick(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    this.click.emit();
  }
}
