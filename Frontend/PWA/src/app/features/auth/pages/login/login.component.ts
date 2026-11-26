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
