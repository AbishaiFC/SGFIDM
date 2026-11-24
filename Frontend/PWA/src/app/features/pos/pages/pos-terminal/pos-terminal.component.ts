import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPosTerminalOrganismComponent, PosTotalsLineDto } from '../../../../shared/components/organisms/pos-terminal/sgfidm-pos-terminal-organism.component';

const DEFAULT_TOTALS: PosTotalsLineDto[] = [
  { label: 'Subtotal', value: '$0.00' },
  { label: 'Descuento', value: '$0.00' },
  { label: 'TOTAL', value: '$0.00', total: true, hasDivider: true },
];

/**
 * PosTerminalPage — Plantilla de la Terminal de Punto de Venta (POS) del Design System SGFIDM.
 *
 * Plantilla (template): compone el organismo PosTerminalOrganism. Anatomía:
 * columna de carrito + panel de totales. Datos por defecto del negocio (vacío al inicio).
 *
 * Uso:
 *   <sgfidm-pos-terminal-organism [cartLines]="[]" [totals]="totals()" [pagarDisabled]="true" />
 */
@Component({
  standalone: true,
  imports: [CommonModule, SgfidmPosTerminalOrganismComponent],
  selector: 'sgfidm-pos-terminal',
  styleUrl: './pos-terminal.component.scss',
  templateUrl: './pos-terminal.component.html',
})
export class PosTerminalComponent {
  readonly totals = DEFAULT_TOTALS;
}
