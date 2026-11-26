import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { SgfidmPinInputComponent } from '../../../../shared/components/atoms/pin-input/sgfidm-pin-input.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/** AUTH-08 — Verificación por teléfono con código OTP de 6 dígitos (Figma EMP / Verificación por teléfono). */
@Component({
  standalone: true,
  imports: [SgfidmPinInputComponent, SgfidmButtonComponent],
  selector: 'sgfidm-employee-verify-phone',
  styleUrl: './employee-verify-phone.component.scss',
  templateUrl: './employee-verify-phone.component.html',
})
export class EmployeeVerifyPhoneComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  readonly codigo = EmployeeVerifyPhoneComponent.readState('codigo');
  otp = '';
  errorMessage = '';
  isLoading = false;

  onVerificar(otp: string): void {
    this.otp = otp;
    this.errorMessage = '';
    if (otp.length !== 6) {
      this.errorMessage = 'Ingresa los 6 dígitos del código.';
      return;
    }

    this.isLoading = true;
    this.auth.verificarOTP(this.codigo, otp).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/auth/employee/access-setup']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'El código no es válido o expiró. Solicita uno nuevo.';
      },
    });
  }

  onReenviar(): void {
    this.errorMessage = '';
    this.otp = '';
  }

  private static readState(key: string): string {
    try {
      const state = window.history.state as Record<string, unknown> | null;
      return typeof state?.[key] === 'string' ? (state[key] as string) : 'EMP-001';
    } catch {
      return 'EMP-001';
    }
  }
}
