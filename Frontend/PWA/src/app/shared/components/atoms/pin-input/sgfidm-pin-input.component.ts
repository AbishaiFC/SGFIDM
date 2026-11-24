import { Component, computed, input, model, output } from '@angular/core';

/**
 * SgfidmPinInput — Átomo de entrada PIN de 6 dígitos.
 * Componente propio de SGFIDM (no existe en Angular Material).
 *
 * (según Design System SGFIDM §04.2.4 y AUTH-15):
 *   320×160px, radio 12px (radius-xl)
 *   6 dígitos, nunca se pre-rellena, error tras intentos fallidos,
 *   nunca se guarda en claro
 *
 * Tokens: --sgfidm-color-surface, --sgfidm-color-outline, --sgfidm-color-error,
 *         --sgfidm-radius-xl, --sgfidm-color-text-primary
 */
@Component({
  standalone: true,
  selector: 'sgfidm-pin-input',
  imports: [],
  templateUrl: './sgfidm-pin-input.component.html',
  styleUrl: './sgfidm-pin-input.component.scss',
})
export class SgfidmPinInputComponent {
  readonly label = input('PIN de acceso rápido');
  readonly subtitle = input('6 dígitos · 5 intentos máximos');
  readonly value = model<string>('');
  readonly error = input<string | null>(null);
  readonly disabled = input(false);
  readonly pinComplete = output<string>();

  readonly pinLength = 6;
  readonly digits = computed(() => Array.from({ length: this.pinLength }, (_, i) => i));
  readonly hasError = computed(() => !!this.error());
  readonly isComplete = computed(() => this.value().length === this.pinLength);

  onDigitInput(index: number, event: Event): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    const target = event.target as HTMLInputElement;
    let newValue = this.value();
    newValue = newValue.slice(0, index) + target.value + newValue.slice(index + 1);
    this.value.set(newValue);

    if (this.isComplete()) {
      this.pinComplete.emit(newValue);
    }
  }

  onDigitKeydown(index: number, event: KeyboardEvent): void {
    if (this.disabled()) {
      event.preventDefault();
      return;
    }
    if (event.key === 'Backspace') {
      let newValue = this.value();
      newValue = newValue.slice(0, index) + '' + newValue.slice(index + 1);
      this.value.set(newValue);
      const prevInput = document.querySelector(`[data-pin-index="${index - 1}"]`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  clear(): void {
    this.value.set('');
  }
}
