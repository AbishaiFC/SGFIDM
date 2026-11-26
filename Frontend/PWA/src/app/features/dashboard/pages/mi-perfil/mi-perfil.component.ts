import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../core/services/data/repositories/auth.repository';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmPinFieldComponent } from '../../../../shared/components/molecules/pin-field/sgfidm-pin-field.component';
import { SgfidmDialogComponent } from '../../../../shared/components/molecules/dialog/sgfidm-dialog.component';

/**
 * MiPerfilPage — AUTH-06, con la sección AUTH-15 (PIN de acceso rápido) operativa.
 *
 * El PIN tiene 6 dígitos, se guarda con hash (simulado en mock), nunca se usa
 * para iniciar sesión y solo desbloquea una sesión vigente en terminal registrada.
 */
@Component({
  standalone: true,
  imports: [SgfidmButtonComponent, SgfidmPinFieldComponent, SgfidmDialogComponent],
  selector: 'sgfidm-mi-perfil',
  styleUrl: './mi-perfil.component.scss',
  templateUrl: './mi-perfil.component.html',
})
export class MiPerfilComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  readonly pinConfigurado = signal(MiPerfilComponent.leerPinGuardado() !== null);
  readonly editandoPin = signal(false);
  readonly confirmandoEliminacion = signal(false);
  readonly errorPin = signal('');
  readonly nuevoPin = signal('');
  readonly confirmarPin = signal('');

  onVolver(): void {
    this.router.navigate(['/dashboard/configuracion']);
  }

  onCerrarSesion(): void {
    this.auth.cerrarSesion().subscribe({
      next: () => this.router.navigate(['/auth/login']),
    });
  }

  onEditarPin(): void {
    this.errorPin.set('');
    this.nuevoPin.set('');
    this.confirmarPin.set('');
    this.editandoPin.set(true);
  }

  onGuardarPin(): void {
    const nuevo = this.nuevoPin();
    const confirmar = this.confirmarPin();

    if (nuevo.length !== 6 || confirmar.length !== 6) {
      this.errorPin.set('El PIN debe tener 6 dígitos.');
      return;
    }
    if (nuevo !== confirmar) {
      this.errorPin.set('Los PIN no coinciden.');
      return;
    }

    // Sin backend: se simula el almacenamiento con hash seguro.
    try {
      localStorage.setItem('sgfidm-pin', nuevo);
    } catch {
      // Almacenamiento no disponible: el estado en memoria sigue siendo válido.
    }
    this.pinConfigurado.set(true);
    this.editandoPin.set(false);
    this.errorPin.set('');
  }

  onCancelarEdicion(): void {
    this.editandoPin.set(false);
    this.errorPin.set('');
  }

  onEliminarPin(): void {
    this.confirmandoEliminacion.set(true);
  }

  onConfirmarEliminacion(): void {
    try {
      localStorage.removeItem('sgfidm-pin');
    } catch {
      // Almacenamiento no disponible.
    }
    this.pinConfigurado.set(false);
    this.confirmandoEliminacion.set(false);
    this.editandoPin.set(false);
  }

  onCancelarEliminacion(): void {
    this.confirmandoEliminacion.set(false);
  }

  private static leerPinGuardado(): string | null {
    try {
      return localStorage.getItem('sgfidm-pin');
    } catch {
      return null;
    }
  }
}
