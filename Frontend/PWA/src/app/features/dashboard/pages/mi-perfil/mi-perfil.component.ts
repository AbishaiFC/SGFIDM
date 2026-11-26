import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../core/services/data/repositories/auth.repository';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * MiPerfilPage — Pantalla AUTH-06 "Mi perfil" (ADM - Con Empleados / Mi perfil).
 *
 * Vista de solo lectura del propietario: datos de la cuenta, sesión actual,
 * PIN de acceso rápido (AUTH-15) y preferencias de accesibilidad.
 * Se alcanza desde Dashboard → Configuración → Mi perfil.
 */
@Component({
  standalone: true,
  imports: [SgfidmButtonComponent],
  selector: 'sgfidm-mi-perfil',
  styleUrl: './mi-perfil.component.scss',
  templateUrl: './mi-perfil.component.html',
})
export class MiPerfilComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  onVolver(): void {
    this.router.navigate(['/dashboard/configuracion']);
  }

  onCerrarSesion(): void {
    this.auth.cerrarSesion().subscribe({
      next: () => this.router.navigate(['/auth/login']),
    });
  }
}
