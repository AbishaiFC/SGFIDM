import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * SesionRevocadaPage — AUTH-17, pantalla de bloqueo contextual tras una revocación
 * de sesión durante una operación POS (§2.6).
 *
 * El PIN no puede recuperar una sesión revocada: solo sirve una autenticación
 * válida. No se muestra información sensible de la venta.
 */
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-sesion-revocada',
  styleUrl: './sesion-revocada.component.scss',
  templateUrl: './sesion-revocada.component.html',
})
export class SesionRevocadaComponent {
  private readonly router = inject(Router);

  readonly operacion = 'VTA-PEND-0042';
  readonly estado = 'Operación pendiente · carrito conservado';

  onReautenticar(): void {
    this.router.navigate(['/auth/employee/login']);
  }
}
