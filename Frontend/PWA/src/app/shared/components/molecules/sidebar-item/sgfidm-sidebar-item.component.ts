import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmSidebarItem — Molécula de item de sidebar/navegación del Design System SGFIDM.
 *
 * Combina icono + label de texto. Varias tres variantes por el COMPONENT_SET 195:2808:
 * default | active | disabled.
 * Anatomía: icono + gap 12 px + label. Active: superficie-container + acento de 3 px
 * (no se usa color para navegar — decisión impresa).
 *
 * Uso:
 *   <sgfidm-sidebar-item variant="active" icon="dashboard" label="Dashboard" (nav)="navigate()" />
 */
@Component({
  selector: 'sgfidm-sidebar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-sidebar-item.component.html',
  styleUrl: './sgfidm-sidebar-item.component.scss',
})
export class SgfidmSidebarItemComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  variant = input<'default' | 'active' | 'disabled'>('default');
  icon = input.required<string>();
  label = input.required<string>();
  route = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  nav = output<string | undefined>();

  onClick(): void {
    if (this.variant() !== 'disabled') {
      this.nav.emit(this.route());
    }
  }
}
