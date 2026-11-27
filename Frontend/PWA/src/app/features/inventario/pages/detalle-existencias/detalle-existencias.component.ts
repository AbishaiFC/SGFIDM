import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../../../shared/components/molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmPaginationComponent } from '../../../../shared/components/molecules/pagination/sgfidm-pagination.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Movimiento {
  fecha: string;
  tipo: string;
  cantidad: string;
  resultante: number;
  usuario: string;
}

/**
 * INV-02 — Inventario: Detalle de existencias (Módulo 05), modo Solo.
 * Canon Figma 1045:129726 adaptado: sin sucursal ni EMP-XXX en el registro.
 *
 * ToDo: INV-03 movimientos, INV-04 historial, INV-05 ajustes y archivado.
 */
@Component({
  standalone: true,
  imports: [
    SgfidmPanelCardComponent,
    SgfidmIndicatorCardComponent,
    SgfidmPaginationComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-detalle-existencias',
  templateUrl: './detalle-existencias.component.html',
  styleUrl: './detalle-existencias.component.scss',
})
export class DetalleExistenciasComponent {
  private readonly router = inject(Router);

  readonly codigo = 'PROD-018';
  readonly nombre = 'Café de altura';
  readonly barras = '7501031310012';
  readonly categoria = 'Café y té';
  readonly pagina = signal(1);
  readonly aviso = signal('');

  readonly indicadores = [
    { eyebrow: 'EXISTENCIAS', value: '12' },
    { eyebrow: 'STOCK MÍNIMO', value: '5' },
    { eyebrow: 'PRECIO DE VENTA', value: '$185.00' },
    { eyebrow: 'COSTO', value: '$92.00' },
    { eyebrow: 'MARGEN BRUTO', value: '50.3%' },
  ];

  readonly movimientos: Movimiento[] = [
    { fecha: 'Hoy · 11:20', tipo: 'Salida · Venta', cantidad: '−2', resultante: 12, usuario: 'Ana Martínez' },
    { fecha: 'Ayer · 17:05', tipo: 'Entrada · Compra', cantidad: '+4', resultante: 14, usuario: 'Ana Martínez' },
    { fecha: 'Ayer · 15:40', tipo: 'Salida · Venta', cantidad: '−6', resultante: 10, usuario: 'Ana Martínez' },
    { fecha: '08 nov', tipo: 'Entrada · Compra', cantidad: '+10', resultante: 16, usuario: 'Ana Martínez' },
    { fecha: '04 nov', tipo: 'Salida · Venta', cantidad: '−2', resultante: 6, usuario: 'Ana Martínez' },
    { fecha: '31 oct', tipo: 'Entrada · Inicial', cantidad: '+8', resultante: 8, usuario: 'Ana Martínez' },
  ];

  volver(): void {
    this.router.navigate(['/inventario']);
  }

  pendiente(id: string, nombre: string): void {
    this.aviso.set(`ToDo ${id}: «${nombre}» pendiente de implementar.`);
  }
}
