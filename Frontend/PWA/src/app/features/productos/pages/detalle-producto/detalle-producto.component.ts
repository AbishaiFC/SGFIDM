import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../../../shared/components/molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmTabsComponent } from '../../../../shared/components/atoms/tabs/sgfidm-tabs.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Fila {
  fecha: string;
  campo: string;
  anterior: string;
  nuevo: string;
  usuario: string;
}

interface Movimiento {
  fecha: string;
  tipo: string;
  detalle: string;
  cantidad: string;
  saldo: string;
}

/**
 * PROD-03 — Productos: Detalle (5 pestañas), modo Solo.
 * Canon Figma 1045:136701 y variantes de pestañas, adaptado sin sucursal ni EMP.
 *
 * ToDo: PROD-04 editar, PROD-06 archivar, INV-02 detalle de existencias y
 * vínculos a REP-03 reporte de inventario.
 */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, 
    SgfidmPanelCardComponent,
    SgfidmIndicatorCardComponent,
    SgfidmTabsComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.scss',
})
export class DetalleProductoComponent {
  private readonly router = inject(Router);

  readonly codigo = 'PROD-018';
  readonly nombre = 'Café de altura';
  readonly barras = '7501031310012';
  readonly categoria = 'Café y té';

  readonly tabs = [
    'Información general',
    'Existencias',
    'Historial de precios y costos',
    'Márgenes',
    'Movimientos',
  ];
  readonly tab = signal('Información general');

  readonly indicadores = [
    { eyebrow: 'PRECIO BASE', value: '$185.00' },
    { eyebrow: 'COSTO', value: '$92.00' },
    { eyebrow: 'MARGEN BRUTO', value: '50.3%' },
    { eyebrow: 'EXISTENCIAS', value: '18' },
    { eyebrow: 'STOCK MÍNIMO', value: '5' },
  ];

  readonly datos = [
    { etiqueta: 'NOMBRE', valor: this.nombre },
    { etiqueta: 'CÓDIGO DE BARRAS', valor: this.barras },
    { etiqueta: 'CATEGORÍA', valor: this.categoria },
  ];
  readonly datosDerecha = [
    { etiqueta: 'UNIDAD DE MEDIDA', valor: 'Unidad' },
    { etiqueta: 'STOCK MÍNIMO', valor: '5' },
    { etiqueta: 'ESTADO', valor: 'Activo' },
  ];

  readonly historial: Fila[] = [
    { fecha: '12 nov 2026', campo: 'Precio base', anterior: '$165.00', nuevo: '$185.00', usuario: 'Ana Martínez' },
    { fecha: '28 oct 2026', campo: 'Costo', anterior: '$84.00', nuevo: '$92.00', usuario: 'Ana Martínez' },
    { fecha: '03 oct 2026', campo: 'Precio base', anterior: '$150.00', nuevo: '$165.00', usuario: 'Ana Martínez' },
    { fecha: '19 sep 2026', campo: 'Costo', anterior: '$78.50', nuevo: '$84.00', usuario: 'Ana Martínez' },
    { fecha: '29 ago 2026', campo: 'Precio base', anterior: '$135.00', nuevo: '$150.00', usuario: 'Ana Martínez' },
  ];

  readonly movimientos: Movimiento[] = [
    { fecha: '12 nov 2026', tipo: 'Venta', detalle: 'POS · ticket #0441', cantidad: '−2', saldo: '18' },
    { fecha: '08 nov 2026', tipo: 'Entrada', detalle: 'Recepción de compra', cantidad: '+6', saldo: '20' },
    { fecha: '02 nov 2026', tipo: 'Venta', detalle: 'POS · ticket #0428', cantidad: '−1', saldo: '14' },
    { fecha: '25 oct 2026', tipo: 'Venta', detalle: 'POS · ticket #0410', cantidad: '−2', saldo: '15' },
    { fecha: '21 oct 2026', tipo: 'Ajuste', detalle: 'Conteo físico · diferencia', cantidad: '−1', saldo: '17' },
  ];

  readonly margenes = [
    { etiqueta: 'Precio de venta', valor: '$185.00' },
    { etiqueta: 'Costo', valor: '− $92.00' },
    { etiqueta: 'Utilidad bruta por unidad', valor: '$93.00' },
    { etiqueta: 'Margen bruto (sobre precio)', valor: '50.3%' },
    { etiqueta: 'Markup (sobre costo)', valor: '101.1%' },
    { etiqueta: 'Utilidad bruta en existencias (18 uds)', valor: '$1,674.00' },
  ];

  readonly aviso = signal('');

  volver(): void {
    this.router.navigate(['/productos']);
  }

  verInventario(): void {
    this.router.navigate(['/inventario']);
  }

  pendiente(id: string, nombre: string): void {
    this.aviso.set(`ToDo ${id}: «${nombre}» pendiente de implementar.`);
  }
}
