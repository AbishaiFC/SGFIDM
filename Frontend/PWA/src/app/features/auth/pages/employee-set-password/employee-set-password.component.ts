import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';

/** AUTH-11 — Establecer contraseña personal del empleado (Figma EMP / Establecer contraseña). */
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent, SgfidmPasswordFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-employee-set-password',
  styleUrl: './employee-set-password.component.scss',
  templateUrl: './employee-set-password.component.html',
})
export class EmployeeSetPasswordComponent {
  private readonly router = inject(Router);

  nuevaPassword = '';
  confirmarPassword = '';
  errorMessage = '';
  confirmError = '';

  onGuardar(): void {
    this.errorMessage = '';
    this.confirmError = '';

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Inténtalo de nuevo.';
      this.confirmError = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.esValida(this.nuevaPassword)) {
      this.errorMessage =
        'La contraseña debe incluir al menos 8 caracteres, 1 letra mayúscula y 1 número.';
      return;
    }

    // No hay método específico en AuthRepository para alta de contraseña de empleado.
    // AUTH-13: empleado con 2+ sucursales elige la activa antes de operar.
    this.router.navigate(['/dashboard/select-branch']);
  }

  private esValida(password: string): boolean {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }
}
