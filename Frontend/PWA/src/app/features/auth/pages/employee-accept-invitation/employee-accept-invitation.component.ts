import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';

/** AUTH-12 — Aceptar invitación por correo y crear contraseña (Figma EMP / Aceptar invitación). */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, SgfidmAuthCardComponent, SgfidmPasswordFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-employee-accept-invitation',
  styleUrl: './employee-accept-invitation.component.scss',
  templateUrl: './employee-accept-invitation.component.html',
})
export class EmployeeAcceptInvitationComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly nombre = this.query('nombre', 'María López');
  readonly codigo = this.query('codigo', 'EMP-006');

  password = '';
  confirmarPassword = '';
  errorMessage = '';
  confirmError = '';

  onAceptar(): void {
    this.errorMessage = '';
    this.confirmError = '';

    if (this.password !== this.confirmarPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Inténtalo de nuevo.';
      this.confirmError = 'Las contraseñas no coinciden.';
      return;
    }

    if (!this.esValida(this.password)) {
      this.errorMessage =
        'La contraseña debe incluir al menos 8 caracteres, 1 letra mayúscula y 1 número.';
      return;
    }

    this.router.navigate(['/auth/employee/login']);
  }

  private query(key: string, fallback: string): string {
    return this.route.snapshot.queryParamMap.get(key) ?? fallback;
  }

  private esValida(password: string): boolean {
    return password.length >= 8 && /[A-Z]/.test(password) && /\d/.test(password);
  }
}
