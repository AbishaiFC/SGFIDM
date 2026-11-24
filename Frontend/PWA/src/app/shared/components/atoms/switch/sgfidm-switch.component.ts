import { Component, computed, input, model, output } from '@angular/core';

/**
 * SgfidmSwitch — Átomo de interruptor.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.5):
 *   State: off | on | disabled
 *   Lienzo: 40×24px, radio 12px (radius-xl)
 *   Perilla: 18×18px, blanco cuando está encendido
 *
 * Tokens: --sgfidm-color-primary, --sgfidm-color-outline-variant, --sgfidm-radius-xl
 */
@Component({
  standalone: true,
  selector: 'sgfidm-switch',
  imports: [],
  templateUrl: './sgfidm-switch.component.html',
  styleUrl: './sgfidm-switch.component.scss',
})
export class SgfidmSwitchComponent {
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
