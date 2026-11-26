import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * CajaPendientePage — AUTH-14 "Recuperación de caja pendiente" (paso bloqueante tras el login).
 *
 * Se presenta cuando el empleado tiene una caja abierta sin sesión activa (§2.5).
 * No cierra la caja ni altera su saldo: ofrece recuperarla, arquearla/cerrarla
 * o solicitar intervención del propietario.
 */
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-caja-pendiente',
  styleUrl: './caja-pendiente.component.scss',
  templateUrl: './caja-pendiente.component.html',
})
export class CajaPendienteComponent {
  private readonly router = inject(Router);

  readonly caja = {
    codigo: 'CAJ-002',
    estado: 'Huérfana',
    sucursal: 'Mi negocio · Matriz',
    apertura: 'Hoy, 08:30 AM',
    ultimaActividad: 'Venta POS-104 · hoy 09:41',
  };

  readonly solicitudEnviada = signal(false);

  onRecuperar(): void {
    this.router.navigate(['/dashboard/select-branch']);
  }

  onArqueoYCierre(): void {
    this.router.navigate(['/caja']);
  }

  onSolicitarIntervencion(): void {
    this.solicitudEnviada.set(true);
  }
}
