import { SgfidmIconComponent } from './../../atoms/icon/sgfidm-icon.component';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmSearchBarComponent } from '../../molecules/search-bar/sgfidm-search-bar.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

/** DTO de línea de totales del organismo POS (compatibilidad con usos previos). */
export interface PosTotalsLineDto {
  label: string;
  value: string;
  total?: boolean;
  hasDivider?: boolean;
}

interface Producto {
  nombre: string;
  codigo: string;
  precio: number;
  stock: number;
}

interface LineaCarrito {
  producto: Producto;
  cantidad: number;
}

/**
 * SgfidmPosTerminalOrganism — Terminal POS-01 en modo Solo (Figma 1145:82203).
 *
 * Sucursal implícita (SUC-001), sin filtro por empleado. El carrito, el
 * descuento global y los totales se calculan localmente con datos mock.
 */
@Component({
  selector: 'sgfidm-pos-terminal-organism',
  standalone: true,
  imports: [SgfidmIconComponent, 
    CommonModule,
    FormsModule,
    SgfidmPanelCardComponent,
    SgfidmSearchBarComponent,
    SgfidmButtonComponent,
  ],
  templateUrl: './sgfidm-pos-terminal-organism.component.html',
  styleUrl: './sgfidm-pos-terminal-organism.component.scss',
})
export class SgfidmPosTerminalOrganismComponent {
  private readonly router = inject(Router);

  // Entradas conservadas por compatibilidad; la vista Solo usa el estado local.
  cartLines = input<{ label: string; empty?: boolean }[]>([]);
  totals = input<PosTotalsLineDto[]>([]);
  pagarDisabled = input(false);

  /** Abre el modal POS-02 con el total actual del carrito. */
  readonly pagar = output<number>();

  readonly sugerencias: Producto[] = [
    { nombre: 'Café de altura', codigo: 'PROD-018 · 7501031310012', precio: 180, stock: 12 },
    { nombre: 'Taza térmica', codigo: 'PROD-022 · 7501031310029', precio: 320, stock: 16 },
    { nombre: 'Pan artesanal', codigo: 'PROD-031 · 7501031310043', precio: 45, stock: 12 },
    { nombre: 'Grano descafeinado', codigo: 'PROD-047 · 7501031310057', precio: 210, stock: 0 },
  ];

  readonly carrito = signal<LineaCarrito[]>([
    { producto: this.sugerencias[0], cantidad: 2 },
    { producto: this.sugerencias[1], cantidad: 1 },
    { producto: this.sugerencias[2], cantidad: 4 },
  ]);

  readonly descuento = signal(10);
  query = '';

  readonly productos = computed(() =>
    this.carrito().reduce((sum, linea) => sum + linea.cantidad, 0),
  );
  readonly subtotal = computed(() =>
    this.carrito().reduce((sum, linea) => sum + linea.producto.precio * linea.cantidad, 0),
  );
  readonly descuentoMonto = computed(() => (this.subtotal() * this.descuento()) / 100);
  readonly total = computed(() => this.subtotal() - this.descuentoMonto());

  get tieneDescuento(): boolean {
    return this.descuento() > 0;
  }

  monto(valor: number): string {
    return `$${valor.toFixed(2)}`;
  }

  subtotalLinea(linea: LineaCarrito): string {
    return this.monto(linea.producto.precio * linea.cantidad);
  }

  agregar(producto: Producto): void {
    if (producto.stock === 0) {
      return;
    }
    const actual = this.carrito().find((linea) => linea.producto === producto);
    if (actual) {
      this.carrito.set(
        this.carrito().map((linea) =>
          linea.producto === producto ? { ...linea, cantidad: linea.cantidad + 1 } : linea,
        ),
      );
      return;
    }
    this.carrito.set([...this.carrito(), { producto, cantidad: 1 }]);
  }

  cambiarCantidad(producto: Producto, delta: number): void {
    this.carrito.set(
      this.carrito()
        .map((linea) =>
          linea.producto === producto
            ? { ...linea, cantidad: Math.max(0, linea.cantidad + delta) }
            : linea,
        )
        .filter((linea) => linea.cantidad > 0),
    );
  }

  quitar(producto: Producto): void {
    this.carrito.set(this.carrito().filter((linea) => linea.producto !== producto));
  }

  vaciar(): void {
    this.carrito.set([]);
  }

  aplicarDescuento(): void {
    this.descuento.set(10);
  }

  quitarDescuento(): void {
    this.descuento.set(0);
  }

  onPagar(): void {
    if (this.carrito().length === 0) {
      return;
    }
    this.pagar.emit(this.total());
  }

  ir(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
