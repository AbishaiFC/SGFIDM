import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  SgfidmProductosOrganismComponent,
  ProductoCatalogDto,
} from '../../../../shared/components/organisms/productos/sgfidm-productos-organism.component';

/**
 * PROD-01 — Productos: Catálogo (Módulo 04), modo Solo.
 * Compone el organismo canónico del DS con datos mock del catálogo global.
 *
 * ToDo: PROD-03 detalle, PROD-04 edición, PROD-05 categorías y PROD-06 archivar.
 */
@Component({
  standalone: true,
  imports: [SgfidmProductosOrganismComponent],
  selector: 'sgfidm-productos',
  template: `
    <sgfidm-productos-organism
      [productos]="productos"
      [totalGeneral]="128"
      [totalActivos]="114"
      [totalBajoStock]="3"
      (accion)="onAccion($event)"
      (agregarProducto)="agregarProducto()"
      (categorias)="abrirCategorias()"
    />
    @if (aviso()) {
      <p class="productos-page__aviso" role="status">{{ aviso() }}</p>
    }
  `,
  styles: `
    .productos-page__aviso {
      margin: 12px 0 0;
      font-size: 11px;
      color: var(--sgfidm-color-warning, #9a6b14);
      font-family: var(--sgfidm-font-family);
    }
  `,
})
export class ProductosComponent {
  private readonly router = inject(Router);

  readonly aviso = signal('');

  readonly productos: ProductoCatalogDto[] = [
    { id: 'P-018', codigo: 'PROD-018', codigoBarras: '7501031310012', nombre: 'Café de altura', categoria: 'Café y té', precioVenta: '$185.00', costo: '$92.00', existencias: 12, status: 'activo' },
    { id: 'P-019', codigo: 'PROD-019', codigoBarras: '7501031310013', nombre: 'Grano de café', categoria: 'Café y té', precioVenta: '$220.00', costo: '$118.00', existencias: 3, bajoStock: true, status: 'activo' },
    { id: 'P-022', codigo: 'PROD-022', codigoBarras: '7501031310044', nombre: 'Taza térmica', categoria: 'Accesorios', precioVenta: '$249.00', costo: '$140.00', existencias: 7, status: 'activo' },
    { id: 'P-031', codigo: 'PROD-031', nombre: 'Pan artesanal', categoria: 'Panadería', precioVenta: '$48.00', existencias: 2, bajoStock: true, status: 'activo' },
    { id: 'P-020', codigo: 'PROD-020', nombre: 'Café soluble', categoria: 'Café y té', precioVenta: '$150.00', costo: '$98.00', existencias: 18, status: 'activo' },
    { id: 'P-032', codigo: 'PROD-032', nombre: 'Pan de caja', categoria: 'Panadería', precioVenta: '$38.00', costo: '$25.00', existencias: 24, status: 'activo' },
  ];

  agregarProducto(): void {
    this.router.navigate(['/productos/registrar']);
  }

  abrirCategorias(): void {
    this.aviso.set('');
    this.router.navigate(['/productos/categorias']);
  }

  onAccion(producto: ProductoCatalogDto): void {
    this.router.navigate(['/productos', producto.codigo]);
  }
}
