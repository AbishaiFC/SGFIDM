import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';

/**
 * AUTH-09 — Configuración de acceso (primer acceso del empleado).
 * No tiene frame Figma propio: se deriva del catálogo AUTH-09 y enlaza
 * las dos rutas de alta (AUTH-10 Vincular teléfono / AUTH-11 Establecer contraseña).
 */
@Component({
  standalone: true,
  imports: [SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-employee-access-setup',
  styleUrl: './employee-access-setup.component.scss',
  templateUrl: './employee-access-setup.component.html',
})
export class EmployeeAccessSetupComponent {
  private readonly router = inject(Router);

  onVincularTelefono(): void {
    this.router.navigate(['/auth/employee/link-phone']);
  }

  onEstablecerContrasena(): void {
    this.router.navigate(['/auth/employee/set-password']);
  }
}
