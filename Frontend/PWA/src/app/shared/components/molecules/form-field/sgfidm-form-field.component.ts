import {
  Component,
  input,
  output,
  model,
  computed,
  signal,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export type FormFieldType = 'text' | 'email' | 'password' | 'number' | 'tel';
export type FormFieldState = 'default' | 'focus' | 'filled' | 'error' | 'disabled';

/**
 * SgfidmFormField — Molecula de campo de formulario del Design System SGFIDM.
 *
 * Combina label flotante, input nativo con tokens SGFIDM, icono leading/trailing
 * opcional y mensaje de error/ayuda. Cubre todos los estados del spec:
 * default · focus · filled · error · disabled.
 *
 * Uso:
 *   <sgfidm-form-field
 *     label="Correo electrónico"
 *     type="email"
 *     [(value)]="correo"
 *     [errorMessage]="errors.correo"
 *   />
 */
@Component({
  selector: 'sgfidm-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sgfidm-form-field.component.html',
  styleUrl: './sgfidm-form-field.component.scss',
})
export class SgfidmFormFieldComponent {
  // ── Inputs ────────────────────────────────────────────────────────────────
  label = input.required<string>();
  type = input<FormFieldType>('text');
  placeholder = input<string>('');
  value = model<string>('');
  errorMessage = input<string>('');
  helperText = input<string>('');
  leadingIcon = input<string>('');
  trailingIcon = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  autocomplete = input<string>('off');
  inputId = input<string>(`sgfidm-ff-${Math.random().toString(36).slice(2, 7)}`);

  // ── Outputs ───────────────────────────────────────────────────────────────
  focused = output<void>();
  blurred = output<void>();
  trailingIconClicked = output<void>();

  // ── Internal state (signal para que computed() reaccione) ─────────────────
  isFocused = signal(false);

  @ViewChild('inputRef') inputRef!: ElementRef<HTMLInputElement>;

  // ── Computed ──────────────────────────────────────────────────────────────
  state = computed<FormFieldState>(() => {
    if (this.disabled()) return 'disabled';
    if (this.errorMessage()) return 'error';
    if (this.isFocused()) return 'focus';
    if (this.value()) return 'filled';
    return 'default';
  });

  labelFloated = computed(() => this.isFocused() || !!this.value());

  // ── Handlers ──────────────────────────────────────────────────────────────
  onFocus(): void {
    this.isFocused.set(true);
    this.focused.emit();
  }

  onBlur(): void {
    this.isFocused.set(false);
    this.blurred.emit();
  }

  onTrailingIconClick(): void {
    this.trailingIconClicked.emit();
  }

  focus(): void {
    this.inputRef?.nativeElement.focus();
  }
}
