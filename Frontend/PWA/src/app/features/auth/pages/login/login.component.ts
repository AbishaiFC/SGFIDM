import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import {
  LoginSubmitDto,
  SgfidmLoginOrganismComponent,
} from '../../../../shared/components/organisms/login/sgfidm-login-organism.component';

/** LoginPage — compone el organismo SgfidmLoginOrganism y proyecta los enlaces AUTH-01. */
@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, SgfidmLoginOrganismComponent],
  selector: 'sgfidm-login',
  styleUrl: './login.component.scss',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthRepository);
  private readonly router = inject(Router);

  readonly isLoading = signal(false);
  readonly errorMessage = signal('');

  onSubmit(datos: LoginSubmitDto): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.login(datos.email, datos.password).subscribe({
      next: (sesion) => {
        // Persistimos la sesión para que la Sidebar resuelva rol y empleado (Ficha 366:15636).
        try {
          localStorage.setItem('sgfidm-sesion', JSON.stringify(sesion));
        } catch {
          // Sin almacenamiento: la navegación continúa con el estado en memoria.
        }
        this.auth.obtenerUsuarioActual().subscribe((usuario) => {
          try {
            localStorage.setItem('sgfidm-usuario', JSON.stringify(usuario ?? {}));
          } catch {
            // Sin almacenamiento: se mantiene el usuario en memoria.
          }
        });
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
