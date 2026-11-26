import { Component, computed, input, output } from '@angular/core';

/**
 * SgfidmButton — Átomo base de acción.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.1):
 *   Type: primary | secondary | tertiary | destructive
 *   Size: sm (32px) | md (40px) | lg (48px)
 *   State: default | disabled | loading
 *
 * Tokens: --sgfidm-color-primary, --sgfidm-color-surface, --sgfidm-color-error,
 *         --sgfidm-color-outline, --sgfidm-radius-md, --sgfidm-space-2, etc.
 */
@Component({
  standalone: true,
  selector: 'sgfidm-button',
  imports: [],
  templateUrl: './sgfidm-button.component.html',
  styleUrl: './sgfidm-button.component.scss',
})
export class SgfidmButtonComponent {
  readonly type = input<'primary' | 'secondary' | 'tertiary' | 'destructive'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly click = output<void>();

  /** Ancho/alto explícitos para las vistas (evita ::ng-deep repetido). */
  readonly fullWidth = input(false);
  readonly width = input<string>('');
  readonly height = input<string>('');

  readonly buttonWidth = computed(() => (this.fullWidth() ? '100%' : this.width() || null));

  readonly buttonHeight = computed(() => {
    if (this.height()) {
      return this.height();
    }
    const map = {
      sm: 'var(--sgfidm-btn-height-sm)',
      md: 'var(--sgfidm-btn-height-md)',
      lg: 'var(--sgfidm-btn-height-lg)',
    };
    return map[this.size()];
  });

  readonly paddingX = computed(() => {
    const map = { sm: '13px', md: '18px', lg: '22px' };
    return map[this.size()];
  });

  onClick(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      return;
    }
    this.click.emit();
  }
}
