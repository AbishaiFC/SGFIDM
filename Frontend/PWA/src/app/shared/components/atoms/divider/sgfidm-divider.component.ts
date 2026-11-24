import { Component, input } from '@angular/core';

/**
 * SgfidmDivider — Átomo de separador.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * (según Design System SGFIDM §04.1.8):
 *   240×1px, fill #DBDBDB (outline-variant)
 *   Uso: "Separador: 1 px outline-variant"
 *
 * Tokens: --sgfidm-color-outline-variant
 */
@Component({
  standalone: true,
  selector: 'sgfidm-divider',
  imports: [],
  templateUrl: './sgfidm-divider.component.html',
  styleUrl: './sgfidm-divider.component.scss',
})
export class SgfidmDividerComponent {
  readonly vertical = input(false);
}
