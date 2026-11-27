import { Component, input, output, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmFormFieldComponent } from '../form-field/sgfidm-form-field.component';

/**
 * SgfidmPasswordField — Molecula de campo de contrasena del Design System SGFIDM.
 *
 * Extiende SgfidmFormField con toggle de visibilidad (ojo), estado show/hide
 * y los mismos estados de validacion. Cubre AUTH-01, AUTH-04, AUTH-11.
 *
 * Uso:
 *   <sgfidm-password-field
 *     label="Contraseña"
 *     [(value)]="password"
 *     [errorMessage]="errors.password"
 *   />
 */
@Component({
  selector: 'sgfidm-password-field',
  standalone: true,
  imports: [CommonModule, SgfidmFormFieldComponent],
  template: `
    <sgfidm-form-field
      [label]="label()"
      [placeholder]="placeholder()"
      [type]="visible ? 'text' : 'password'"
      [value]="value()"
      (valueChange)="value.set($event)"
      [errorMessage]="errorMessage()"
      [helperText]="helperText()"
      [disabled]="disabled()"
      [required]="required()"
      [leadingIcon]="leadingIcon()"
      [trailingIcon]="visible ? 'visibility_off' : 'visibility'"
      [trailingActionLabel]="visible ? 'Ocultar contraseña' : 'Mostrar contraseña'"
      [autocomplete]="autocomplete()"
      [inputId]="inputId()"
      (trailingIconClicked)="toggleVisibility()"
      (focused)="focused.emit()"
      (blurred)="blurred.emit()"
    />
  `,
})
export class SgfidmPasswordFieldComponent {
  label        = input.required<string>();
  placeholder  = input<string>('');
  value        = model<string>('');
  errorMessage = input<string>('');
  helperText   = input<string>('');
  disabled     = input<boolean>(false);
  required     = input<boolean>(false);
  leadingIcon  = input<string>('lock');
  inputId      = input<string>(`sgfidm-pf-${Math.random().toString(36).slice(2, 7)}`);
  autocomplete = input<string>('current-password');

  focused = output<void>();
  blurred = output<void>();

  visible = false;

  toggleVisibility(): void {
    this.visible = !this.visible;
  }
}
