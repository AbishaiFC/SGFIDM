import { Component, computed, input, model, output } from '@angular/core';

/**
 * SgfidmCheckbox — Átomo de casilla de verificación.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.3):
 *   State: default | selected | disabled
 *   Lienzo: 40×40px (hit target mínimo)
 *   Caja interior: 18×18px, radio 4px, fill+stroke #2A2A2A (primary)
 *
 * Tokens: --sgfidm-color-primary, --sgfidm-color-on-primary, --sgfidm-color-surface,
 *         --sgfidm-color-outline, --sgfidm-color-text-disabled, --sgfidm-radius-sm
 */
@Component({
  standalone: true,
  selector: 'sgfidm-checkbox',
  imports: [],
  templateUrl: './sgfidm-checkbox.component.html',
  styleUrl: './sgfidm-checkbox.component.scss',
})
export class SgfidmCheckboxComponent {
  readonly label = input('');
  readonly checked = model<boolean>(false);
  readonly disabled = input(false);
  readonly change = output<boolean>();

  readonly isDisabled = computed(() => this.disabled());
  readonly isChecked = computed(() => this.checked());

  onChange(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLInputElement;
    const newValue = target.checked;
    this.checked.set(newValue);
    this.change.emit(newValue);
  }
}
