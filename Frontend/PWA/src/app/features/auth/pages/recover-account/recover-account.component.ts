import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SgfidmTextFieldComponent } from '../../../../shared/components/atoms/text-field/sgfidm-text-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * RecoverAccountPage — Pantalla AUTH-02 "Recuperar cuenta" (ADM / Recuperar cuenta).
 * Solicitar recuperación por correo: escribe el correo con el que te registraste.
 */
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SgfidmTextFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-recover-account',
  styleUrl: './recover-account.component.scss',
  templateUrl: './recover-account.component.html',
})
export class RecoverAccountComponent {
  private readonly router = inject(Router);

  email = '';
  isLoading = false;

  onEnviarInstrucciones(): void {
    this.isLoading = true;
  }

  onVolverAlLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
