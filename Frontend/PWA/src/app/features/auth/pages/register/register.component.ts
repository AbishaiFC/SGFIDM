import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * RegisterPage — Pantalla de Registro de cuenta (AUTH-R01, ADM / Registro de cuenta).
 * Título "Crea tu cuenta", campos Nombre del administrador, Correo electrónico,
 * Contraseña y Confirmar contraseña, con helpers, aviso de error y link "Iniciar sesión".
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SgfidmAuthCardComponent,
    SgfidmPasswordFieldComponent,
    SgfidmFormFieldComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-register',
  styleUrl: './register.component.scss',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  nombre = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  onRegister(): void {
    this.errorMessage = '';

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden. Inténtalo de nuevo.';
      return;
    }

    this.isLoading = true;
    this.auth.crearCuenta({ nombre: this.nombre, correo: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/verify-email']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'No se pudo registrar. Inténtalo de nuevo.';
      },
    });
  }
}
