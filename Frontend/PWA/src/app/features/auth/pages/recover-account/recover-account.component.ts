import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';

/**
 * RecoverAccountPage — Pantalla AUTH-02 "Recuperar cuenta" (ADM / Recuperar cuenta).
 * Solicitar recuperación por correo: escribe el correo con el que te registraste.
 */
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SgfidmFormFieldComponent, SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-recover-account',
  styleUrl: './recover-account.component.scss',
  templateUrl: './recover-account.component.html',
})
export class RecoverAccountComponent {
  private readonly router = inject(Router);

  email = '';
  isLoading = false;

  onEnviarInstrucciones(): void {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    // AUTH-03: el correo viaja en navigation state, nunca en la URL.
    this.router.navigate(['/auth/recovery-sent'], { state: { email: this.email } });
  }

  onVolverAlLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
