import { SgfidmIconComponent } from './../../atoms/icon/sgfidm-icon.component';
import { Component, input, output, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPinInputComponent } from '../../atoms/pin-input/sgfidm-pin-input.component';

export type PinFieldState = 'idle' | 'loading' | 'error' | 'success';

/**
 * SgfidmPinField — Molecula de ingreso de PIN del Design System SGFIDM.
 *
 * Envuelve SgfidmPinInputComponent con titulo, subtitulo contextual,
 * mensaje de error visible y estados de carga/exito.
 * Cubre AUTH-08 (OTP), AUTH-15 (crear PIN), AUTH-16 (desbloqueo de terminal).
 *
 * Uso:
 *   <sgfidm-pin-field
 *     title="Ingresa tu PIN de 6 dígitos"
 *     (pinComplete)="onPinCompleted($event)"
 *   />
 */
@Component({
  selector: 'sgfidm-pin-field',
  standalone: true,
  imports: [SgfidmIconComponent, CommonModule, SgfidmPinInputComponent],
  templateUrl: './sgfidm-pin-field.component.html',
  styleUrl: './sgfidm-pin-field.component.scss',
})
export class SgfidmPinFieldComponent {
  // ── Inputs ────────────────────────────────────────────────────────────────
  title = input<string>('PIN de acceso rápido');
  subtitle = input<string>('6 dígitos · 5 intentos máximos');
  errorMessage = input<string>('');
  state = input<PinFieldState>('idle');

  // ── Outputs ───────────────────────────────────────────────────────────────
  /** Emite el PIN completo cuando el átomo lo reporta. */
  pinComplete = output<string>();

  // ── Child ref ─────────────────────────────────────────────────────────────
  pinInput = viewChild(SgfidmPinInputComponent);

  // ── Handlers ──────────────────────────────────────────────────────────────
  onPinComplete(pin: string): void {
    this.pinComplete.emit(pin);
  }

  /** Resetea el campo (usar tras fallo de autenticacion). */
  clear(): void {
    this.pinInput()?.value.set('');
  }
}
