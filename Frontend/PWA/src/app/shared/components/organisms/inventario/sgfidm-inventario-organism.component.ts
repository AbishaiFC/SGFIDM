import { SgfidmIconComponent } from './../../atoms/icon/sgfidm-icon.component';
import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmEmptyStateComponent } from '../../molecules/empty-state/sgfidm-empty-state.component';
import { SgfidmSearchBarComponent } from '../../molecules/search-bar/sgfidm-search-bar.component';
import { SgfidmPaginationComponent } from '../../molecules/pagination/sgfidm-pagination.component';
import { SgfidmChipComponent } from '../../atoms/chip/sgfidm-chip.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

export type EstadoInventario = 'Con stock' | 'Bajo stock' | 'Agotado' | 'Sin alerta';
export type FiltroInventario = 'Todos' | 'Con stock' | 'Bajo stock' | 'Agotados' | 'Sin alerta';

/** DTO de una fila de existencias generales (INV-01). */
export interface ProductoInventarioDto {
  id: string;
  codigo: string;
  codigoBarras?: string;
  nombre: string;
  categoria: string;
  costo: string;
  precio: string;
  stock: number;
  stockCritico: number;
  estado: EstadoInventario;
}

/**
 * SgfidmInventarioOrganism — Existencias generales (INV-01, Módulo 05),
 * canon Figma 1145:82832 en modo Solo.
 *
 * Compone PanelCard, SearchBar, Chip, Button y Pagination del DS. El modo Solo
 * no tiene selector de sucursal (existencias del negocio).
 *
 * ToDo: ajustes, alertas y movimientos (INV-02..), y existencias por sucursal
 * cuando el negocio opere con sucursales.
 */
@Component({
  selector: 'sgfidm-inventario-organism',
  standalone: true,
  imports: [SgfidmIconComponent, 
    CommonModule,
    FormsModule,
    SgfidmPanelCardComponent,
    SgfidmEmptyStateComponent,
    SgfidmSearchBarComponent,
    SgfidmPaginationComponent,
    SgfidmChipComponent,
    SgfidmButtonComponent,
  ],
  templateUrl: './sgfidm-inventario-organism.component.html',
  styleUrl: './sgfidm-inventario-organism.component.scss',
})
export class SgfidmInventarioOrganismComponent {
  productos = input<ProductoInventarioDto[]>([]);
  totalGeneral = input<number>(0);
  totalBajoStock = input<number>(0);
  totalAgotados = input<number>(0);

  readonly accion = output<ProductoInventarioDto>();
  readonly registrarMovimiento = output<void>();
  readonly ajustar = output<void>();
  readonly alertas = output<void>();

  readonly filtros: FiltroInventario[] = [
    'Todos',
    'Con stock',
    'Bajo stock',
    'Agotados',
    'Sin alerta',
  ];
  readonly porPagina = 6;

  readonly busqueda = signal('');
  readonly estadoFiltro = signal<FiltroInventario>('Todos');
  readonly pagina = signal(1);

  readonly stockCritico = computed(() =>
    this.productos().filter((p) => p.estado === 'Bajo stock' || p.estado === 'Agotado'),
  );
  readonly mostrarEmptyState = computed(() => this.productos().length === 0);

  readonly filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const filtro = this.estadoFiltro();
    return this.productos().filter((p) => {
      const coincide =
        !q ||
        p.nombre.toLowerCase().includes(q) ||
        p.codigo.toLowerCase().includes(q) ||
        (p.codigoBarras ?? '').includes(q);
      const porEstado =
        filtro === 'Todos' ||
        (filtro === 'Agotados' ? p.estado === 'Agotado' : p.estado === filtro);
      return coincide && porEstado;
    });
  });

  readonly totalPaginas = computed(() =>
    Math.max(1, Math.ceil(this.filtrados().length / this.porPagina)),
  );
  readonly paginados = computed(() => {
    const inicio = (this.pagina() - 1) * this.porPagina;
    return this.filtrados().slice(inicio, inicio + this.porPagina);
  });
  readonly rango = computed(() => {
    const inicio = (this.pagina() - 1) * this.porPagina + 1;
    const fin = Math.min(this.pagina() * this.porPagina, this.filtrados().length);
    return `${inicio}–${fin}`;
  });

  get totalProductos(): string {
    return String(this.totalGeneral() || this.productos().length);
  }
  get totalStockCritico(): string {
    return String(this.totalBajoStock() || this.stockCritico().length);
  }

  seleccionarFiltro(filtro: FiltroInventario): void {
    this.estadoFiltro.set(filtro);
    this.pagina.set(1);
  }

  cambiarPagina(pagina: number): void {
    this.pagina.set(pagina);
  }

  onAccion(prod: ProductoInventarioDto): void {
    this.accion.emit(prod);
  }
}
