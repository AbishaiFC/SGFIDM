import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmSearchBarComponent } from '../../../molecules/search-bar/sgfidm-search-bar.component';
import { SgfidmButtonComponent } from '../../../atoms/button/sgfidm-button.component';
import { FormsModule } from '@angular/forms';

/** DTO de fila del carrito (P6). */
export interface P6CartRow {
  id: string;
  name: string;
  quantity: number;
  unitPrice: string;
}

/**
 * SgfidmP6TerminalPos — Patrón P6 Terminal POS del Design System SGFIDM.
 *
 * P6 "Terminal POS": Búsqueda unificada + carrito + cobro; caja abierta requerida; =48 px/acción.
 *
 * Uso:
 *   <sgfidm-p6-terminal-pos [rows]="cart" (pay)="onPay()" (addRow)="onAdd()" />
 */
@Component({
  selector: 'sgfidm-p6-terminal-pos',
  standalone: true,
  imports: [CommonModule, FormsModule, SgfidmSearchBarComponent, SgfidmButtonComponent],
  templateUrl: './sgfidm-p6-terminal-pos.component.html',
  styleUrl: './sgfidm-p6-terminal-pos.component.scss',
})
export class SgfidmP6TerminalPosComponent {
  /** Filas del carrito. */
  rows: P6CartRow[] = [];

  /** Filtro de búsqueda unificada. */
  query = '';

  /** Total del carrito. */
  get total(): string {
    const toNumber = (value: string): number => parseFloat(value.replace(/[^0-9.-]/g, '')) || 0;
    return this.rows.reduce((sum, r) => sum + toNumber(r.unitPrice) * r.quantity, 0).toFixed(2);
  }

  /** Emite al cobrar el carrito. */
  pay = output();

  /** Emite al agregar una fila al carrito. */
  addRow = output();
}
