import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmEmptyStateComponent } from '../../molecules/empty-state/sgfidm-empty-state.component';
import { SgfidmSearchBarComponent } from '../../molecules/search-bar/sgfidm-search-bar.component';
import { SgfidmPaginationComponent } from '../../molecules/pagination/sgfidm-pagination.component';
import { SgfidmChipComponent } from '../../atoms/chip/sgfidm-chip.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

export interface ProductoCatalogDto {
  id: string;
  codigo: string;
  codigoBarras?: string;
  nombre: string;
  categoria: string;
  precioVenta: string;
  costo?: string;
  existencias: number;
  bajoStock?: boolean;
  status: 'activo' | 'archivado';
}

export type FiltroProducto = 'Activos' | 'Todos' | 'Archivados' | 'Solo bajo stock';

/**
 * SgfidmProductosOrganism — Catálogo de productos (PROD-01, Módulo 04) en modo Solo.
 * Canon Figma 1045:138457 adaptado: sin sucursal ni precios por sucursal.
 * Compone PanelCard, SearchBar, Chip, Button y Pagination del DS.
 *
 * ToDo: PROD-03/04/05/06 (detalle, edición, categorías, archivar) y menú de acciones.
 */
@Component({
  selector: 'sgfidm-productos-organism',
  standalone: true,
  imports: [
    FormsModule,
    SgfidmPanelCardComponent,
    SgfidmEmptyStateComponent,
    SgfidmSearchBarComponent,
    SgfidmPaginationComponent,
    SgfidmChipComponent,
    SgfidmButtonComponent,
  ],
  templateUrl: './sgfidm-productos-organism.component.html',
  styleUrl: './sgfidm-productos-organism.component.scss',
})
export class SgfidmProductosOrganismComponent {
  productos = input<ProductoCatalogDto[]>([]);
  totalGeneral = input<number>(0);
  totalActivos = input<number>(0);
  totalBajoStock = input<number>(0);

  readonly accion = output<ProductoCatalogDto>();
  readonly agregarProducto = output<void>();
  readonly categorias = output<void>();

  readonly filtros: FiltroProducto[] = ['Activos', 'Todos', 'Archivados', 'Solo bajo stock'];
  readonly porPagina = 4;

  readonly busqueda = signal('');
  readonly categoria = signal('Todas las categorías');
  readonly filtro = signal<FiltroProducto>('Activos');
  readonly pagina = signal(1);

  readonly categoriasDisponibles = computed(() => [
    'Todas las categorías',
    ...new Set(this.productos().map((p) => p.categoria)),
  ]);

  readonly filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const cat = this.categoria();
    const filtro = this.filtro();
    return this.productos().filter((p) => {
      const texto = !q || p.nombre.toLowerCase().includes(q) || p.codigo.toLowerCase().includes(q) || (p.codigoBarras ?? '').includes(q);
      const porCategoria = cat === 'Todas las categorías' || p.categoria === cat;
      const porFiltro =
        filtro === 'Todos' ||
        (filtro === 'Activos' && p.status === 'activo') ||
        (filtro === 'Archivados' && p.status === 'archivado') ||
        (filtro === 'Solo bajo stock' && !!p.bajoStock);
      return texto && porCategoria && porFiltro;
    });
  });

  readonly totalPaginas = computed(() => Math.max(1, Math.ceil(this.filtrados().length / this.porPagina)));
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
  get totalActivosTexto(): string {
    return String(this.totalActivos() || this.productos().filter((p) => p.status === 'activo').length);
  }

  seleccionar(filtro: FiltroProducto): void {
    this.filtro.set(filtro);
    this.pagina.set(1);
  }

  cambiarPagina(pagina: number): void {
    this.pagina.set(pagina);
  }
}
