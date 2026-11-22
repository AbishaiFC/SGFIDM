import { Component, computed, input, model, output } from '@angular/core';

/**
 * SgfidmRadio — Átomo de botón de radio.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.4):
 *   State: default | selected | disabled
 *   Lienzo: 40×40px (hit target mínimo)
 *   Anillo exterior: 18×18px, punto interior: 10×10px
 *
 * Tokens: --sgfidm-color-primary, --sgfidm-color-surface, --sgfidm-color-outline,
 *         --sgfidm-color-text-disabled, --sgfidm-radius-full
 */
@Component({
  standalone: true,
  selector: 'sgfidm-radio',
  imports: [],
  templateUrl: './sgfidm-radio.component.html',
  styleUrl: './sgfidm-radio.component.scss',
})
export class SgfidmRadioComponent {
  readonly label = input('');
  readonly value = input<string>('');
  readonly selectedValue = model<string>('');
  readonly disabled = input(false);
  readonly change = output<string>();

  readonly isDisabled = computed(() => this.disabled());
  readonly isSelected = computed(() => this.selectedValue() === this.value());

  onChange(event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this.selectedValue.set(newValue);
    this.change.emit(newValue);
  }
}
