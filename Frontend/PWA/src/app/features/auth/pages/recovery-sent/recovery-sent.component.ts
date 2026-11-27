import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmAuthCardComponent } from '../../../../shared/components/molecules/auth-card/sgfidm-auth-card.component';

/**
 * RecoverySentPage — Pantalla AUTH-03 "Recuperación enviada" (ADM / Recuperación enviada).
 *
 * Confirmación genérica tras solicitar la recuperación: muestra el correo
 * ingresado de forma parcialmente enmascarada, permite reenviar las
 * instrucciones y volver al inicio de sesión.
 */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, RouterLink, SgfidmAuthCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-recovery-sent',
  styleUrl: './recovery-sent.component.scss',
  templateUrl: './recovery-sent.component.html',
})
export class RecoverySentComponent {
  /** Correo recibido desde AUTH-02 vía navigation state (nunca en la URL). */
  readonly email = RecoverySentComponent.readEmailFromState();
  isSending = false;

  /** Enmascaramiento del correo, p. ej. a•••••@empresa.com (según Figma). */
  get maskedEmail(): string {
    if (!this.email) {
      return 'a•••••@empresa.com';
    }

    const [local, domain] = this.email.split('@');
    if (!domain) {
      return this.email;
    }

    return `${local?.charAt(0) || 'a'}•••••@${domain}`;
  }

  onEnviarDeNuevo(): void {
    if (this.isSending) {
      return;
    }

    this.isSending = true;
    // Sin backend: se simula el reenvío y se restaura el botón.
    setTimeout(() => {
      this.isSending = false;
    }, 800);
  }

  private static readEmailFromState(): string {
    try {
      const state = window.history.state as { email?: unknown } | null;
      return typeof state?.email === 'string' ? state.email : '';
    } catch {
      return '';
    }
  }
}
