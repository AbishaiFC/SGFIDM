import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../../../shared/components/molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * REP-03 — Reportes: Inventario (Módulo 10), modo Solo. Canon Figma 1045:141301.
 * Inventario global del negocio (sin comparativo entre sucursales). Solo consulta.
 *
 * ToDo: REP-04/05, REP-06/07 exportación; vínculos a INV-02/08/09.
 */
@Component({
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-reporte-inventario',
  templateUrl: './reporte-inventario.component.html',
  styleUrl: './reporte-inventario.component.scss',
})
export class ReporteInventarioComponent {
  private readonly router = inject(Router);

  readonly aviso = signal('');

  readonly indicadores = [
    { eyebrow: 'EXISTENCIAS', value: '1,240 uds' },
    { eyebrow: 'VALOR INVENTARIO', value: '$186,400.00' },
    { eyebrow: 'BAJO STOCK', value: '14' },
    { eyebrow: 'AGOTADOS', value: '3' },
    { eyebrow: 'MOVIMIENTOS', value: '327' },
    { eyebrow: 'SIN COSTO', value: '2 productos' },
  ];

  readonly productos = [
    { nombre: 'Grano de café · Grano', codigo: 'PROD-019', disponibles: 12, minimo: 10, estado: 'Bajo stock' },
    { nombre: 'Café de altura · 500g', codigo: 'PROD-018', disponibles: 18, minimo: 5, estado: 'Normal' },
    { nombre: 'Pan artesanal · pieza', codigo: 'PROD-031', disponibles: 2, minimo: 8, estado: 'Bajo stock' },
    { nombre: 'Cold brew · 1 L', codigo: 'PROD-067', disponibles: 4, minimo: 12, estado: 'Agotado' },
    { nombre: 'Té verde en hoja', codigo: 'PROD-073', disponibles: 24, minimo: 4, estado: 'Normal' },
  ];

  readonly movimientos = [
    { codigo: 'MOV-0343', fecha: '31 oct', tipo: 'Salida', motivo: 'Venta POS · Café de altura', cantidad: '-2' },
    { codigo: 'MOV-0342', fecha: '30 oct', tipo: 'Salida', motivo: 'Venta POS · Pan artesanal', cantidad: '-20' },
    { codigo: 'MOV-0339', fecha: '24 oct', tipo: 'Entrada', motivo: 'Compra · Grano de café', cantidad: '+50' },
  ];

  readonly alertas = [
    { tipo: 'Agotado', texto: 'Cold brew 1 L (PROD-067)' },
    { tipo: 'Agotado', texto: 'Pan artesanal (PROD-031)' },
    { tipo: 'Bajo stock', texto: 'Grano de café (PROD-019)' },
    { tipo: 'Bajo stock', texto: 'Té verde (PROD-073)' },
  ];

  limpiar(): void {
    this.aviso.set('Filtros restablecidos a los valores por defecto.');
  }

  exportar(): void {
    this.aviso.set('ToDo REP-07: exportación del reporte pendiente de implementar.');
  }

  volver(): void {
    this.router.navigate(['/reportes']);
  }
}
