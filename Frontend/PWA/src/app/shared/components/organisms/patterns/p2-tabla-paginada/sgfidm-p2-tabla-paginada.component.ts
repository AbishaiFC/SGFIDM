import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared.module';
import { SgfidmPaginationComponent } from '../../../molecules/pagination/sgfidm-pagination.component';

interface Item {
  id: string;
  nombre: string;
  precio: string;
  stock: number;
}

@Component({
  selector: 'sgfidm-p2-tabla-paginada',
  standalone: true,
  imports: [CommonModule, SharedModule, SgfidmPaginationComponent],
  templateUrl: './sgfidm-p2-tabla-paginada.component.html',
  styleUrl: './sgfidm-p2-tabla-paginada.component.scss',
})
export class SgfidmP2TablaPaginadaComponent {
  /** Full list of items */
  @Input() items: Item[] = [];

  /** Page size */
  readonly pageSize = 5;

  /** Current page (0‑based) */
  @Input() page = 0;

  /** Slice of items for current page */
  get pageItems(): Item[] {
    const start = this.page * this.pageSize;
    return this.items.slice(start, start + this.pageSize);
  }

  /** Total number of pages */
  get totalPages(): number {
    return Math.ceil(this.items.slice(0).length / this.pageSize);
  }

  /** Update page when pagination emits a change */
  onPageChange(newPage: number): void {
    this.page = newPage;
  }

}
