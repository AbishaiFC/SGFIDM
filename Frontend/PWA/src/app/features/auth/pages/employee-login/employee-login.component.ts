import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmPasswordFieldComponent } from '../../../../shared/components/molecules/password-field/sgfidm-password-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';

/** AUTH-07 — Acceso de empleado con código EMP-XXX y contraseña (Figma EMP / Inicio de sesión). */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    SgfidmAuthCardComponent,
    SgfidmFormFieldComponent,
    SgfidmPasswordFieldComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-employee-login',
  styleUrl: './employee-login.component.scss',
  templateUrl: './employee-login.component.html',
})
export class EmployeeLoginComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  codigo = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  onLogin(): void {
    this.errorMessage = '';
    this.isLoading = true;
    this.auth.loginEmpleado(this.codigo, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/employee/verify-phone'], {
          state: { codigo: this.codigo },
        });
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Credenciales inválidas. Revisa tu código y contraseña.';
      },
    });
  }
}
