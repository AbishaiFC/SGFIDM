import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SgfidmPagination — Molécula de paginación del Design System SGFIDM.
 *
 * Paginación estándar: "‹ 1 2 3 … n ›" — siguiente y anterior.
 * Anatomía (Figma `SGFIDM/Pagination` 195:2837): 288×40 px, fill surface #FFFFFF.
 * El chip de página actual: fill primary, texto #FFFFFF (✎).
 *
 * Uso:
 *   <sgfidm-pagination [totalPages]="24" [(currentPage)]="page" (pageChange)="onPageChange($event)" />
 */
@Component({
  selector: 'sgfidm-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sgfidm-pagination.component.html',
  styleUrl: './sgfidm-pagination.component.scss',
})
export class SgfidmPaginationComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  totalPages = input.required<number>();
  currentPage = input<number>(1);

  // ── Outputs ────────────────────────────────────────────────────────────────
  pageChange = output<number>();

  /** Número máximo de chips de página visibles (incluye chips prev/next y elipsis). */
  readonly maxVisible = input<number>(7);

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Páginas a mostrar: números y 'ellipsis' para la brecha central. */
  visiblePages = computed<Array<number | 'ellipsis'>>(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const max = this.maxVisible();
    if (total <= max) return Array.from({ length: total }, (_, i) => i + 1);

    const pages: Array<number | 'ellipsis'> = [1];
    const start = Math.max(2, current - Math.floor((max - 4) / 2));
    const end = Math.min(total - 1, start + max - 5);

    if (start > 2) pages.push('ellipsis');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < total - 1) pages.push('ellipsis');
    pages.push(total);
    return pages;
  });

  // ── Handlers ──────────────────────────────────────────────────────────────
  onPrev(): void {
    if (this.currentPage() > 1) {
      this.pageChange.emit(this.currentPage() - 1);
    }
  }

  onNext(): void {
    const max = this.totalPages();
    if (this.currentPage() < max) {
      this.pageChange.emit(this.currentPage() + 1);
    }
  }

  onPageSelect(page: number): void {
    this.pageChange.emit(page);
  }

  isDisabled(page: number): boolean {
    return page < 1 || page > this.totalPages();
  }
}
