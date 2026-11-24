import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { SgfidmLoginOrganismComponent } from '../../../../shared/components/organisms/login/sgfidm-login-organism.component';

/**
 * LoginPage — Plantilla de la pantalla de Login (Módulo 00 Auth) del Design System SGFIDM.
 *
 * Plantilla (template): compone el organismo LoginOrganism (AuthCard + FormField + Botones).
 * El organismo emite `submit` con {email, password}; el page pide credenciales al repositorio.
 *
 * Uso:
 *   <sgfidm-login-organism title="Iniciar sesión" (submit)="onSubmit($event)" />
 */
@Component({
  standalone: true,
  imports: [CommonModule, SgfidmLoginOrganismComponent],
  selector: 'sgfidm-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  hidePassword = true;
  isLoading = false;
  errorMessage = '';

  onSubmit(event: { email: string; password: string }): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.auth.login(event.email, event.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        this.isLoading = false;
        this.errorMessage = 'Credenciales inválidas. Inténtalo de nuevo.';
      },
    });
  }
}
