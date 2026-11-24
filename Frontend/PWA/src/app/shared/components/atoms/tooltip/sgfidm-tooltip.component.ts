import { Component, input } from '@angular/core';

/**
 * SgfidmTooltip — Átomo de tooltip.
 * Estilizado sobre Angular Material con tokens SGFIDM.
 *
 * (según Design System SGFIDM §04.1.9):
 *   97×30px, radio 6px (radius-md), fill #1C1C1C (inverse-surface),
 *   texto #EBEBEB (no es on-inverse #FFFFFF, decisión local)
 *
 * Tokens: --sgfidm-color-inverse-surface, --sgfidm-radius-md
 */
@Component({
  standalone: true,
  selector: 'sgfidm-tooltip',
  imports: [],
  templateUrl: './sgfidm-tooltip.component.html',
  styleUrl: './sgfidm-tooltip.component.scss',
})
export class SgfidmTooltipComponent {
  readonly message = input('');
  readonly visible = input(false);
}
