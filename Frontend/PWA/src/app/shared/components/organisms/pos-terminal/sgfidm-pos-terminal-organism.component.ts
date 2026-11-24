import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../molecules/../atoms/button/sgfidm-button.component';

/**
 * DTO de línea de totales del organismo POS.
 */
export interface PosTotalsLineDto {
  label: string;
  value: string;
  total?: boolean;
  hasDivider?: boolean;
}

/**
 * SgfidmPosTerminalOrganism — Organismo de la terminal de punto de venta (POS) del Design System SGFIDM.
 *
 * Organismo forma-level: Layout del POS — columna de carrito + panel de totales.
 * Uso:
 *   <sgfidm-pos-terminal-organism [cartLines]="cart" [totals]="totals" [pagarDisabled]="true" />
 */
@Component({
  selector: 'sgfidm-pos-terminal-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmButtonComponent],
  templateUrl: './sgfidm-pos-terminal-organism.component.html',
  styleUrl: './sgfidm-pos-terminal-organism.component.scss',
})
export class SgfidmPosTerminalOrganismComponent {
  /** Líneas de la columna de carrito. */
  cartLines = input<{ label: string; empty?: boolean }[]>([]);
  /** Líneas del resumen de venta (totals). */
  totals = input<PosTotalsLineDto[]>([]);
  /** Mantiene totales por defecto si no se proveen. */
  pagarDisabled = input(true);

  get hasCart(): boolean {
    return this.cartLines().length > 0;
  }

  get cartEmptyMessage(): string {
    return this.hasCart ? '' : 'Escanea o busca productos para comenzar';
  }
}
