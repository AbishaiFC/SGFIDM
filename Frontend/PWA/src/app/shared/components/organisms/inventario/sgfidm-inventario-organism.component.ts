import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmEmptyStateComponent } from '../../molecules/empty-state/sgfidm-empty-state.component';

/**
 * DTO para un producto en el organismo Inventario.
 */
export interface ProductoInventarioDto {
  id: string;
  nombre: string;
  costo: string;
  precio: string;
  stock: number;
  stockCritico: number;
}

/**
 * SgfidmInventarioOrganism — Organismo de Inventario (Módulo 05) del Design System SGFIDM.
 *
 * Organismo de listado de inventario: PanelCard con indicadores + EmptyState.
 * Decisión impresa (B12): EmptyState estándar en inventario con botón de contacto al Admin.
 *
 * Uso:
 *   <sgfidm-inventario-organism [productos]="productos()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-inventario-organism',
  standalone: true,
  imports: [CommonModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmEmptyStateComponent],
  templateUrl: './sgfidm-inventario-organism.component.html',
  styleUrl: './sgfidm-inventario-organism.component.scss',
})
export class SgfidmInventarioOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  productos = input<ProductoInventarioDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite el producto seleccionado para la acción. */
  accion = output<ProductoInventarioDto>();

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Productos con stock crítico. */
  readonly stockCritico = computed(() => this.productos().filter((p) => p.stock <= p.stockCritico));

  /** Activación del EmptyState (decisión impresa: estándar + acción). */
  readonly mostrarEmptyState = computed(() => this.productos().length === 0);

  /** Getters para uso en plantilla (valores string). */
  get totalProductos(): string {
    return String(this.productos().length);
  }
  get totalStockCritico(): string {
    return String(this.stockCritico().length);
  }
  get deltaStockCritico(): string {
    return this.stockCritico().length === 0 ? 'Sin alertas' : `${this.stockCritico().length} producto(s) crítico(s)`;
  }

  onAccion(prod: ProductoInventarioDto): void {
    this.accion.emit(prod);
  }
}
