import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * LoginPage — Pantalla de Login (Módulo 00 Auth), diseño igual al Figma (ADM / Inicio de sesión).
 * Card: "Inicia sesión" + subtítulo + Text Field correo + PasswordField contraseña + botón elevado.
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SgfidmFormFieldComponent,
    SgfidmPasswordFieldComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly password = signal('');
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  onSubmit(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.login(this.email(), this.password()).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Credenciales inválidas. Inténtalo de nuevo.');
      },
    });
  }
}
