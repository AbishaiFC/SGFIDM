import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../../../shared/components/molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * REP-02 — Reportes: Ventas (Módulo 10), modo Solo. Canon Figma 1045:141817.
 * Solo consulta: no registra, edita ni anula operaciones. reports.view / export.
 *
 * ToDo: REP-03..05, REP-06/07 exportación y filtros por sucursal de otros modos.
 */
@Component({
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrl: './reporte-ventas.component.scss',
})
export class ReporteVentasComponent {
  private readonly router = inject(Router);

  readonly detalleAbierto = signal(true);
  readonly aviso = signal('');

  readonly indicadores = [
    { eyebrow: 'VENTAS TOTALES', value: '$184,560.00' },
    { eyebrow: 'TRANSACCIONES', value: '1,284' },
    { eyebrow: 'TICKET PROMEDIO', value: '$143.77' },
    { eyebrow: 'DESCUENTOS', value: '$4,230.00' },
    { eyebrow: 'DEVOLUCIONES', value: '−$6,420.00' },
    { eyebrow: 'CANCELACIONES', value: '−$12,300.00' },
  ];

  readonly metodos = [
    { nombre: 'Efectivo', monto: '$98,300.00', porcentaje: '53.3%' },
    { nombre: 'Tarjeta', monto: '$61,240.00', porcentaje: '33.2%' },
    { nombre: 'Transferencia', monto: '$25,020.00', porcentaje: '13.5%' },
  ];

  readonly productos = [
    { nombre: 'Grano de café · Grano', codigo: 'PROD-019', unidades: 420, ingresos: '$49,300', porcentaje: '26.2%' },
    { nombre: 'Café de altura · 500g', codigo: 'PROD-018', unidades: 310, ingresos: '$39,800', porcentaje: '21.6%' },
    { nombre: 'Pan artesanal · pieza', codigo: 'PROD-031', unidades: 380, ingresos: '$15,200', porcentaje: '8.2%' },
    { nombre: 'Cold brew · 1 L', codigo: 'PROD-067', unidades: 150, ingresos: '$12,400', porcentaje: '6.7%' },
    { nombre: 'Taza térmica · acero', codigo: 'PROD-052', unidades: 64, ingresos: '$11,800', porcentaje: '6.4%' },
  ];

  readonly ventas = [
    { codigo: 'VTA-00231', fecha: '31 oct', metodo: 'Efectivo', total: '$580.00', estado: 'Completada' },
    { codigo: 'VTA-00229', fecha: '30 oct', metodo: 'Efectivo', total: '$1,250.00', estado: 'Completada' },
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
