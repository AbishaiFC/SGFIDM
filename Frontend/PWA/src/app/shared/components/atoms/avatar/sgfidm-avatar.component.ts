import { Component, computed, input } from '@angular/core';

/**
 * SgfidmAvatar — Átomo de avatar.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * Variantes (según Design System SGFIDM §04.1.12):
 *   Size: sm (32×32, radio 16) | md (40×40, radio 20)
 *   Fondo: primary #2A2A2A, iniciales blancas on-primary
 *
 * Tokens: --sgfidm-color-primary, --sgfidm-color-on-primary, --sgfidm-radius-2xl
 */
@Component({
  standalone: true,
  selector: 'sgfidm-avatar',
  imports: [],
  templateUrl: './sgfidm-avatar.component.html',
  styleUrl: './sgfidm-avatar.component.scss',
})
export class SgfidmAvatarComponent {
  readonly size = input<'sm' | 'md'>('md');
  readonly initials = input('CM');

  readonly dimensions = computed(() => {
    const map: Record<string, string> = {
      sm: '32px',
      md: '40px',
    };
    return map[this.size()] ?? map['md'];
  });

  readonly radius = computed(() => {
    const map: Record<string, string> = {
      sm: 'var(--sgfidm-radius-2xl)',
      md: '20px',
    };
    return map[this.size()] ?? map['md'];
  });

  readonly fontSize = computed(() => {
    const map: Record<string, string> = {
      sm: '14px',
      md: '16px',
    };
    return map[this.size()] ?? map['md'];
  });
}
