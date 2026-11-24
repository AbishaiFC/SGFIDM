import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SgfidmFormFieldComponent } from '../../molecules/form-field/sgfidm-form-field.component';
import { SgfidmAuthCardComponent } from '../../molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmButtonComponent } from '../../molecules/../atoms/button/sgfidm-button.component';
import { SgfidmIconButtonComponent } from '../../molecules/../atoms/icon-button/sgfidm-icon-button.component';

/**
 * SgfidmLoginOrganism — Organismo de la pantalla de Login del Design System SGFIDM.
 *
 * Organismo de autenticación: compone AuthCard + FormField + SgfidmButton.
 * Anatomía: AuthCard organismo contenedor + formulario de login.
 *
 * Uso:
 *   <sgfidm-login-organism title="Iniciar sesión" (submit)="onSubmit()" />
 */
@Component({
  selector: 'sgfidm-login-organism',
  standalone: true,
  imports: [CommonModule, FormsModule, SgfidmFormFieldComponent, SgfidmAuthCardComponent, SgfidmButtonComponent, SgfidmIconButtonComponent],
  templateUrl: './sgfidm-login-organism.component.html',
  styleUrl: './sgfidm-login-organism.component.scss',
})
export class SgfidmLoginOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  /** Título del card (required). */
  title = input.required<string>();
  subtitle = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  submit = output<LoginSubmitDto>();

  // ── State ──────────────────────────────────────────────────────────────────
  isLoading = signal(false);
  hidePassword = signal(true);
  errorMessage = input<string>('');
  showPasswordError = input<boolean>(false);
  showEmailError = input<boolean>(false);
  /** Atajos de datos para los form fields (opcional). */
  emailLabel = input<string>('Correo electrónico');
  passwordLabel = input<string>('Contraseña');
  emailPlaceholder = input<string>('');
  passwordPlaceholder = input<string>('');

  /** Estado local del formulario (vs. form-field usando [(ngModel)]="value"). */
  readonly form = { email: '', password: '' };

  /** Resetea el estado de carga/error (usar tras resultados). */
  resetState(): void {
    this.isLoading.set(false);
  }

  /** Toggle visibilidad de la contraseña. */
  togglePassword(): void {
    this.hidePassword.set(!this.hidePassword());
  }

  /** Emite submit con los datos del formulario. */
  onSubmit(): void {
    this.submit.emit({ email: this.form.email, password: this.form.password });
  }
}

/** DTO emitiido por submit del organismo Login. */
export interface LoginSubmitDto {
  email: string;
  password: string;
}
