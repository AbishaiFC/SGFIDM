import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import {
  ExportarModalComponent,
  ExportacionSolicitud,
} from '../exportar-modal/exportar-modal.component';
import { registrarExportacion } from '../exportar-modal/exportar.utils';

/**
 * REP-05 — Reportes: Finanzas (Módulo 10), modo Solo. Canon Figma 1045:140893.
 * Distingue resultado comercial (valor económico) de flujo de efectivo (caja).
 *
 * ToDo: REP-06/07 exportación, FIN-09 detalle y POS-06 detalle de venta.
 */
@Component({
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmButtonComponent, ExportarModalComponent],
  selector: 'sgfidm-reporte-finanzas',
  templateUrl: './reporte-finanzas.component.html',
  styleUrl: './reporte-finanzas.component.scss',
})
export class ReporteFinanzasComponent {
  private readonly router = inject(Router);

  readonly aviso = signal('');
  readonly exportando = signal(false);

  readonly resultado = [
    { etiqueta: 'INGRESOS POR VENTAS', valor: '$118,450' },
    { etiqueta: 'INGRESOS MANUALES', valor: '$10,000' },
    { etiqueta: 'INGRESOS TOTALES', valor: '$128,450' },
    { etiqueta: 'CMV', valor: '$52,100' },
    { etiqueta: 'UTILIDAD BRUTA', valor: '$76,350', estimada: true },
    { etiqueta: 'MARGEN BRUTO', valor: '59.4%' },
    { etiqueta: 'GASTOS', valor: '$34,200' },
    { etiqueta: 'UTILIDAD NETA', valor: '$42,150', estimada: true },
  ];

  readonly flujo = [
    { etiqueta: 'ENTRADAS DE CAJA', valor: '+$64,200.00' },
    { etiqueta: 'SALIDAS DE CAJA', valor: '−$45,550.00' },
    { etiqueta: 'FLUJO NETO DE EFECTIVO', valor: '+$18,650.00' },
  ];

  readonly ingresos = [
    { nombre: 'Ventas', monto: '$118,450', porcentaje: '92.2%' },
    { nombre: 'Manuales', monto: '$10,000', porcentaje: '7.8%' },
  ];

  readonly gastos = [
    { nombre: 'Insumos y mat. prima', monto: '$14,800', porcentaje: '43.3%' },
    { nombre: 'Servicios básicos', monto: '$8,200', porcentaje: '24.0%' },
    { nombre: 'Mantenimiento', monto: '$5,600', porcentaje: '16.4%' },
    { nombre: 'Sin categoría', monto: '$5,600', porcentaje: '16.3%' },
  ];

  readonly movimientos = [
    { codigo: 'VTA-00231', fecha: '31 oct', tipo: 'Venta', concepto: 'Venta POS: Prensa francesa, Café altura', metodo: 'Efectivo', estado: 'Activo', monto: '+$580.00' },
    { codigo: 'GAS-00048', fecha: '30 oct', tipo: 'Gasto', concepto: 'Compra leche entera y deslactosada', metodo: 'Efectivo', estado: 'Activo', monto: '−$384.00' },
    { codigo: 'ING-00018', fecha: '29 oct', tipo: 'Ingreso', concepto: 'Venta de mobiliario y mesas en desuso', metodo: 'Transfer.', estado: 'Activo', monto: '+$4,500.00' },
    { codigo: 'VTA-00228', fecha: '28 oct', tipo: 'Venta', concepto: 'Venta POS: Cold brew, Pan artesanal', metodo: 'Efectivo', estado: 'Anulado', monto: '$330.00' },
  ];

  limpiar(): void {
    this.aviso.set('Filtros restablecidos a los valores por defecto.');
  }

  exportar(): void {
    this.aviso.set('');
    this.exportando.set(true);
  }

  cerrarExportar(): void {
    this.exportando.set(false);
  }

  confirmarExportar(solicitud: ExportacionSolicitud): void {
    registrarExportacion(solicitud);
    this.exportando.set(false);
    this.aviso.set(`Exportación de ${solicitud.reporte} registrada en el historial (REP-06).`);
  }

  verDetalle(codigo: string): void {
    this.aviso.set(`ToDo FIN-09/POS-06: detalle de ${codigo} pendiente de implementar.`);
  }

  volver(): void {
    this.router.navigate(['/reportes']);
  }
}
