import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared.module';
import { SgfidmPaginationComponent } from '../../../molecules/pagination/sgfidm-pagination.component';

/** DTO para una fila de la tabla administrativa (P3). */
export interface P3Row {
  id: string;
  [key: string]: string | number | boolean;
}

/** DTO para la acción de una fila (acciones al final). */
export interface P3RowAction {
  id: string;
}

/**
 * SgfidmP3TablaAdministrativa — Patrón P3 Tabla administrativa del Design System SGFIDM.
 *
 * P3 "Tabla administrativa": Header CAPS · fila 44 px · acciones al final ·
 * orden visible · paginación `‹ n ›`.
 *
 * Uso:
 *   <sgfidm-p3-tabla-administrativa [columns]="['nombre','precio']" [rows]="rows"
 *     (action)="onAction($event)" />
 */
@Component({
  selector: 'sgfidm-p3-tabla-administrativa',
  standalone: true,
  imports: [CommonModule, SharedModule, SgfidmPaginationComponent],
  templateUrl: './sgfidm-p3-tabla-administrativa.component.html',
  styleUrl: './sgfidm-p3-tabla-administrativa.component.scss',
})
export class SgfidmP3TablaAdministrativaComponent {
  /** Headers de las columnas (estilo almacena los nombres crudos; el header se muestra en CAPS). */
  @Input() columns: string[] = [];

  /** Filas de datos. */
  @Input() rows: P3Row[] = [];

  /** Número de filas por página. */
  @Input() pageSize = 10;

  /** Página actual (0-based). */
  @Input() page = 0;

  /** Emite la acción de una fila. */
  action = output<P3RowAction>();

  /** Filas filtradas por página. */
  get pageRows(): P3Row[] {
    const start = this.page * this.pageSize;
    return this.rows.slice(start, start + this.pageSize);
  }

  /** Número total de páginas. */
  get totalPages(): number {
    return Math.max(1, Math.ceil((this.rows.length || 0) / this.pageSize));
  }

  /** Emite la acción asociada a una fila (acciones al final). */
  onAction(row: P3Row): void {
    this.action.emit({ id: row.id });
  }

  /** Emite el cambio de columna activa para orden visible (orden). */
  sortChange = output<string>();

  /** Marca la columna ordenada y emite el cambio. */
  onSort(column: string): void {
    this.sortedColumn = column;
    this.sortChange.emit(column);
  }

  /** Columna actualmente ordenada (orden visible). */
  sortedColumn = '';
}
