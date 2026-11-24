import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmBadgeComponent } from '../../molecules/../atoms/badge/sgfidm-badge.component';
import { SgfidmTabsComponent } from '../../molecules/../atoms/tabs/sgfidm-tabs.component';
import { SgfidmEmptyStateComponent } from '../../molecules/empty-state/sgfidm-empty-state.component';

/**
 * DTO de línea del catálogo de productos.
 */
export interface ProductoCatalogDto {
  id: string;
  codigo: string;          // PROD-XXX
  nombre: string;
  precioVenta: string;
  costo?: string;
  status: 'activo' | 'archivado';
}

/**
 * SgfidmProductosOrganism — Organismo del Catálogo de Productos (PROD-01) del Design System SGFIDM.
 *
 * Organismo de listado de catálogo: PanelCard + IndicatorCard + Tabs + EmptyState + SgfidmButton.
 * Decisión impresa: "Productos siempre visibles, identificados por PROD-XXX".
 *
 * Uso:
 *   <sgfidm-productos-organism [productos]="catalogo()" (accion)="onAccion($event)" />
 */
@Component({
  selector: 'sgfidm-productos-organism',
  standalone: true,
  imports: [CommonModule, FormsModule, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmBadgeComponent, SgfidmTabsComponent, SgfidmEmptyStateComponent],
  templateUrl: './sgfidm-productos-organism.component.html',
  styleUrl: './sgfidm-productos-organism.component.scss',
})
export class SgfidmProductosOrganismComponent {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  productos = input<ProductoCatalogDto[]>([]);

  // ── Outputs ────────────────────────────────────────────────────────────────
  /** Emite el producto seleccionado con la acción (detalle/editar/archivar/reactivar). */
  accion = output<{ producto: ProductoCatalogDto; tipo: 'detalle' | 'editar' | 'archivar' | 'reactivar' }>();
  /** Emite al registrar primer producto (INICIO-02). */
  primerRegistrar = output<void>();

  // ── State ──────────────────────────────────────────────────────────────────
  readonly tabs = ['activos', 'archivados'];
  private readonly tabActivo = signal<string>('activos');

  // ── Computed ──────────────────────────────────────────────────────────────
  /** Productos por tab activo. */
  get productosFiltro(): ProductoCatalogDto[] {
    return this.productos().filter((p) =>
      this.tabActivo() === 'activos' ? p.status === 'activo' : p.status === 'archivado',
    );
  }

  get productosActivos(): ProductoCatalogDto[] {
    return this.productos().filter((p) => p.status === 'activo');
  }

  get countActivos(): string {
    return String(this.productosActivos.length);
  }

  get mostrarEmpty(): boolean {
    const tab = this.tabActivo();
    const filtro = this.productosFiltro;
    return filtro.length === 0 && this.productos().length > 0
      ? (tab === 'activos' ? this.productos().every((p) => p.status !== 'activo') : this.productos().every((p) => p.status !== 'archivado'))
      : (this.productos().length === 0 && tab === 'activos');
  }

  // ── Handlers ──────────────────────────────────────────────────────────────
  onTab(tab: string): void {
    this.tabActivo.set(tab);
  }

  onAccion(prod: ProductoCatalogDto, tipo: 'detalle' | 'editar' | 'archivar' | 'reactivar'): void {
    this.accion.emit({ producto: prod, tipo });
  }
}
