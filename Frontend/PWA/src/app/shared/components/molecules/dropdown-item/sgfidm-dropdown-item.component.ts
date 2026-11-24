import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmDropdownItem — Molécula de item de dropdown del Design System SGFIDM.
 *
 * Nodo Option de lista desplegable. Varias dos variantes por el COMPONENT_SET 195:2815:
 * default | disabled. Anatomía: icono opcional + gap 12 px + texto.
 * Anatomía per Figma: 220×38 px · radio 6 px (radius-md) · default: texto #1C1C1C ⛓text-primary.
 *
 * Uso:
 *   <sgfidm-dropdown-item label="Opcion A" (select)="onSelect()" />
 *   <sgfidm-dropdown-item label="Opcion deshabilitada" variant="disabled" />
 */
@Component({
  selector: 'sgfidm-dropdown-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-dropdown-item.component.html',
  styleUrl: './sgfidm-dropdown-item.component.scss',
})
export class SgfidmDropdownItemComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  variant = input<'default' | 'disabled'>('default');
  label = input.required<string>();
  icon = input<string>('');

  // ── Outputs ────────────────────────────────────────────────────────────────
  select = output<void>();

  onClick(): void {
    if (this.variant() !== 'disabled') {
      this.select.emit();
    }
  }
}
