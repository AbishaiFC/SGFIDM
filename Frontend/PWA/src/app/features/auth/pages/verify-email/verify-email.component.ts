import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SgfidmTextFieldComponent } from '../../../../shared/components/atoms/text-field/sgfidm-text-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * VerifyEmailPage — Pantalla de Verificación de cuenta (AUTH-R02 — Verificación de correo).
 * Confirma tu correo electrónico: aviso informativo, campo de texto con la dirección,
 * botón "Abrir mi correo" y "Reenviar enlace de verificación" + enlace "Iniciar sesión".
 */
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, SgfidmTextFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-verify-email',
  styleUrl: './verify-email.component.scss',
  templateUrl: './verify-email.component.html',
})
export class VerifyEmailComponent {
  private readonly router = inject(Router);

  readonly email = signal('');
  readonly isLoading = signal(false);
  readonly reenviando = signal(false);

  onAbrirCorreo(): void {
    const val = this.email() || '';
    if (val) window.open(`mailto:${val}`, '_blank');
  }

  onReenviar(): void {
    this.reenviando.set(true);
    setTimeout(() => this.reenviando.set(false), 1500);
  }

  onIniciarSesion(): void {
    this.router.navigate(['/auth/login']);
  }
}
