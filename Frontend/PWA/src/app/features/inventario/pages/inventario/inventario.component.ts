import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  SgfidmInventarioOrganismComponent,
  ProductoInventarioDto,
} from '../../../../shared/components/organisms/inventario/sgfidm-inventario-organism.component';

/**
 * INV-01 — Inventario: Existencias generales (Módulo 05), modo Solo.
 * Compone el organismo canónico del DS con datos mock del catálogo.
 *
 * ToDo: INV-02 (movimientos), INV-03 (ajustes), INV-04 (alertas) y existencias
 * por sucursal cuando el negocio opere con sucursales.
 */
@Component({
  standalone: true,
  imports: [SgfidmInventarioOrganismComponent],
  selector: 'sgfidm-inventario',
  template: `
    <sgfidm-inventario-organism
      [productos]="productos"
      [totalGeneral]="totalGeneral"
      [totalBajoStock]="totalBajoStock"
      [totalAgotados]="totalAgotados"
      (accion)="onAccion($event)"
      (alertas)="verAlertas()"
    />
  `,
})
export class InventarioComponent {
  private readonly router = inject(Router);

  readonly totalGeneral = 58;
  readonly totalBajoStock = 6;
  readonly totalAgotados = 2;

  readonly productos: ProductoInventarioDto[] = [
    { id: 'P-018', codigo: 'PROD-018', codigoBarras: '7501031310012', nombre: 'Café de altura', categoria: 'Café y té', costo: '$120.00', precio: '$185.00', stock: 12, stockCritico: 5, estado: 'Con stock' },
    { id: 'P-019', codigo: 'PROD-019', codigoBarras: '7501031310013', nombre: 'Grano de café', categoria: 'Café y té', costo: '$150.00', precio: '$220.00', stock: 3, stockCritico: 8, estado: 'Bajo stock' },
    { id: 'P-022', codigo: 'PROD-022', codigoBarras: '7501031310044', nombre: 'Taza térmica', categoria: 'Accesorios', costo: '$170.00', precio: '$249.00', stock: 0, stockCritico: 2, estado: 'Agotado' },
    { id: 'P-031', codigo: 'PROD-031', nombre: 'Pan artesanal', categoria: 'Panadería', costo: '$32.00', precio: '$48.00', stock: 2, stockCritico: 0, estado: 'Sin alerta' },
    { id: 'P-020', codigo: 'PROD-020', codigoBarras: '7501031310014', nombre: 'Café soluble', categoria: 'Café y té', costo: '$98.00', precio: '$150.00', stock: 18, stockCritico: 6, estado: 'Con stock' },
    { id: 'P-032', codigo: 'PROD-032', codigoBarras: '7501031310045', nombre: 'Pan de caja', categoria: 'Panadería', costo: '$25.00', precio: '$38.00', stock: 24, stockCritico: 6, estado: 'Con stock' },
    { id: 'P-033', codigo: 'PROD-033', nombre: 'Azúcar 1kg', categoria: 'Panadería', costo: '$18.00', precio: '$29.00', stock: 4, stockCritico: 5, estado: 'Bajo stock' },
    { id: 'P-034', codigo: 'PROD-034', nombre: 'Servilleta', categoria: 'Accesorios', costo: '$12.00', precio: '$22.00', stock: 0, stockCritico: 3, estado: 'Agotado' },
  ];

  onAccion(producto: ProductoInventarioDto): void {
    this.router.navigate(['/inventario', producto.codigo]);
  }

  verAlertas(): void {
    this.router.navigate(['/inventario/alertas']);
  }
}
