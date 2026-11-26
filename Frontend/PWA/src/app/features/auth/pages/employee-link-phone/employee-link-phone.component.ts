import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/** AUTH-10 — Verificación OTP: alta del número de teléfono del empleado (Figma EMP / Vincular teléfono). */
@Component({
  standalone: true,
  imports: [FormsModule, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-employee-link-phone',
  styleUrl: './employee-link-phone.component.scss',
  templateUrl: './employee-link-phone.component.html',
})
export class EmployeeLinkPhoneComponent {
  private readonly router = inject(Router);

  telefono = '';
  errorMessage = '';

  onEnviarCodigo(): void {
    this.errorMessage = '';
    if (this.telefono.replace(/\D/g, '').length < 10) {
      this.errorMessage = 'Ingresa un número de teléfono válido a 10 dígitos.';
      return;
    }

    this.router.navigate(['/auth/employee/verify-phone'], {
      state: { telefono: this.telefono },
    });
  }
}
