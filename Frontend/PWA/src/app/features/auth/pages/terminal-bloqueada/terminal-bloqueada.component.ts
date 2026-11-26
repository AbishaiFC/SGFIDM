import { Component, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmPinFieldComponent } from '../../../../shared/components/molecules/pin-field/sgfidm-pin-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/** AUTH-16 — Terminal POS bloqueada por inactividad; se desbloquea con el PIN de AUTH-15. */
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent, SgfidmPinFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-terminal-bloqueada',
  styleUrl: './terminal-bloqueada.component.scss',
  templateUrl: './terminal-bloqueada.component.html',
})
export class TerminalBloqueadaComponent {
  private readonly router = inject(Router);
  private readonly pinField = viewChild(SgfidmPinFieldComponent);

  readonly intentos = signal(0);
  readonly bloqueada = signal(false);
  readonly error = signal('');
  readonly pinActual = signal('');
  readonly pinConfigurado = TerminalBloqueadaComponent.leerPin() !== null;

  onDesbloquear(): void {
    if (this.bloqueada()) {
      return;
    }

    const pinGuardado = TerminalBloqueadaComponent.leerPin();
    const pin = this.pinActual();

    if (!pinGuardado) {
      this.error.set('No tienes un PIN configurado. Configúralo desde Mi perfil.');
      return;
    }
    if (pin.length !== 6) {
      this.error.set('Ingresa los 6 dígitos del PIN.');
      return;
    }
    if (pin === pinGuardado) {
      this.router.navigate(['/pos']);
      return;
    }

    const nuevosIntentos = this.intentos() + 1;
    this.intentos.set(nuevosIntentos);
    if (nuevosIntentos >= 5) {
      this.bloqueada.set(true);
      this.error.set(
        '5 intentos fallidos. La terminal seguirá bloqueada; reautentícate para continuar.',
      );
    } else {
      this.error.set(`PIN incorrecto. Intentos restantes: ${5 - nuevosIntentos}.`);
    }
    this.pinActual.set('');
    this.pinField()?.clear();
  }

  onReautenticar(): void {
    this.router.navigate(['/auth/employee/login']);
  }

  private static leerPin(): string | null {
    try {
      return localStorage.getItem('sgfidm-pin');
    } catch {
      return null;
    }
  }
}
