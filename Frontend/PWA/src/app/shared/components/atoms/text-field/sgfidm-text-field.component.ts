import { Component, computed, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmTextField — Átomo de campo de texto.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.13):
 *   State: default | filled | focus | error | disabled
 *   Altura: 44px (hit target de formulario de registro)
 *   Etiqueta arriba (no flotante)
 *
 * Tokens: --sgfidm-color-outline, --sgfidm-color-focus-ring, --sgfidm-color-error,
 *         --sgfidm-radius-md, --sgfidm-field-height, --sgfidm-color-text-primary
 */
@Component({
  standalone: true,
  selector: 'sgfidm-text-field',
  imports: [CommonModule],
  templateUrl: './sgfidm-text-field.component.html',
  styleUrl: './sgfidm-text-field.component.scss',
})
export class SgfidmTextFieldComponent {
  private static nextId = 0;
  readonly inputId = `sgfidm-field-${SgfidmTextFieldComponent.nextId++}`;
  readonly label = input('');
  readonly placeholder = input('');
  readonly value = model('');
  readonly disabled = input(false);
  readonly error = input<string | null>(null);
  readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
  readonly autocomplete = input<string | null>(null);
  readonly change = output<string>();

  readonly hasError = computed(() => !!this.error());
  readonly fieldHeight = computed(() => 'var(--sgfidm-field-height)');

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
    this.change.emit(target.value);
  }
}
