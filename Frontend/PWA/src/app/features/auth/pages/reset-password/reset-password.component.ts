import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * ResetPasswordPage — Pantalla AUTH-04 "Restablecer contraseña"
 * (ADM / Restablecer contraseña).
 *
 * Se abre desde el enlace de recuperación (?token=...). Define la nueva
 * contraseña sin volver a escribir el correo y la guarda mediante AuthRepository.
 */
@Component({
  standalone: true,
  imports: [SgfidmPasswordFieldComponent, SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-reset-password',
  styleUrl: './reset-password.component.scss',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** Token de un solo uso recibido en el enlace del correo. */
  readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';

  nuevaPassword = '';
  confirmarPassword = '';
  errorMessage = '';
  errorEyebrow = '';
  confirmError = '';
  isLoading = false;

  get enlaceInvalido(): boolean {
    return !this.token;
  }

  onGuardar(): void {
    this.errorMessage = '';
    this.errorEyebrow = '';
    this.confirmError = '';

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.errorEyebrow = 'CONTRASEÑAS NO COINCIDEN';
      this.errorMessage = 'Las contraseñas no coinciden. Inténtalo de nuevo.';
      this.confirmError = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.esPasswordValida(this.nuevaPassword)) {
      this.errorEyebrow = 'CONTRASEÑA NO VÁLIDA';
      this.errorMessage =
        'La contraseña debe incluir al menos 8 caracteres, 1 letra mayúscula y 1 número.';
      return;
    }

    this.isLoading = true;
    this.auth.restablecerContrasena(this.token, this.nuevaPassword).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/password-reset-success']);
      },
      error: () => {
        this.isLoading = false;
        this.errorEyebrow = 'NO SE PUDO GUARDAR';
        this.errorMessage = 'No se pudo actualizar la contraseña. Solicita un nuevo enlace.';
      },
    });
  }

  onSolicitarNuevoEnlace(): void {
    this.router.navigate(['/auth/recover-account']);
  }

  private esPasswordValida(password: string): boolean {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }
}
