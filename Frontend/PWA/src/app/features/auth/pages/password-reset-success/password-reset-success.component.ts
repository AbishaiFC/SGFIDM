import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/** AUTH-05 — Contraseña restablecida: confirmación y acceso a login (Figma 1130:77870). */
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-password-reset-success',
  styleUrl: './password-reset-success.component.scss',
  templateUrl: './password-reset-success.component.html',
})
export class PasswordResetSuccessComponent {
  private readonly router = inject(Router);

  onIrAlLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
