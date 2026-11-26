import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SgfidmFormFieldComponent } from '../../molecules/form-field/sgfidm-form-field.component';
import { SgfidmPasswordFieldComponent } from '../../molecules/password-field/sgfidm-password-field.component';
import { SgfidmAuthCardComponent } from '../../molecules/auth-card/sgfidm-auth-card.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

/**
 * SgfidmLoginOrganism — Organismo de la pantalla de Login del Design System SGFIDM.
 *
 * Compone AuthCard (variante ancha AUTH) + FormField + PasswordField + SgfidmButton.
 * Los enlaces de la pantalla se proyectan por ng-content desde la página.
 */
@Component({
  selector: 'sgfidm-login-organism',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SgfidmAuthCardComponent,
    SgfidmFormFieldComponent,
    SgfidmPasswordFieldComponent,
    SgfidmButtonComponent,
  ],
  templateUrl: './sgfidm-login-organism.component.html',
  styleUrl: './sgfidm-login-organism.component.scss',
})
export class SgfidmLoginOrganismComponent {
  title = input.required<string>();
  subtitle = input<string>('');
  errorMessage = input<string>('');
  showPasswordError = input<boolean>(false);
  showEmailError = input<boolean>(false);
  loading = input<boolean>(false);

  emailLabel = input<string>('Correo electrónico');
  passwordLabel = input<string>('Contraseña');
  emailPlaceholder = input<string>('');
  passwordPlaceholder = input<string>('');

  /** Estado local de carga (compatibilidad con usos previos). */
  readonly isLoading = signal(false);
  readonly busy = computed(() => this.loading() || this.isLoading());

  readonly form = { email: '', password: '' };

  resetState(): void {
    this.isLoading.set(false);
  }

  onSubmit(): void {
    this.submit.emit({ email: this.form.email, password: this.form.password });
  }

  readonly submit = output<LoginSubmitDto>();
}

/** DTO emitido por submit del organismo Login. */
export interface LoginSubmitDto {
  email: string;
  password: string;
}
