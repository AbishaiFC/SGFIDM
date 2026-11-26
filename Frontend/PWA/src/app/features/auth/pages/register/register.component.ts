import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { FormsModule } from '@angular/forms';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * RegisterPage — Pantalla de Registro de cuenta (Creación de cuenta / Propietario/negocio).
 * Auth-R01. Registro el Propietario: correo + contraseña + confirmación.
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  isLoading = false;

  onRegister(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.auth.crearCuenta({ nombre: this.email, correo: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'No se pudo registrar. Inténtalo de nuevo.';
      },
    });
  }
}
