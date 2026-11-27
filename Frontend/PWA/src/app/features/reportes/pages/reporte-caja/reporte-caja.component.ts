import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../../../shared/components/molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import {
  ExportarModalComponent,
  ExportacionSolicitud,
} from '../exportar-modal/exportar-modal.component';
import { registrarExportacion } from '../exportar-modal/exportar.utils';

/**
 * REP-04 — Reportes: Caja (Módulo 10), modo Solo. Canon Figma 1045:120203.
 * Las diferencias se muestran por sesión: un faltante no compensa un sobrante.
 *
 * ToDo: REP-05/06/07, CAJ-08 detalle de sesión y CAJ-06 resumen de cierre.
 */
@Component({
  standalone: true,
  imports: [
    SgfidmPanelCardComponent,
    SgfidmIndicatorCardComponent,
    SgfidmButtonComponent,
    ExportarModalComponent,
  ],
  selector: 'sgfidm-reporte-caja',
  templateUrl: './reporte-caja.component.html',
  styleUrl: './reporte-caja.component.scss',
})
export class ReporteCajaComponent {
  private readonly router = inject(Router);

  readonly aviso = signal('');
  readonly exportando = signal(false);

  readonly indicadores = [
    { eyebrow: 'SESIONES CERRADAS', value: '44' },
    { eyebrow: 'CON DIFERENCIA', value: '9 · 20.5%' },
    { eyebrow: 'DIFERENCIAS TOT.', value: '−$340.00' },
    { eyebrow: 'FALTANTES', value: '−$810.00' },
    { eyebrow: 'SOBRANTES', value: '+$470.00' },
    { eyebrow: 'ESPERADO TOTAL', value: '$58,200' },
    { eyebrow: 'CONTADO TOTAL', value: '$57,860' },
  ];

  readonly sesiones = [
    { codigo: 'CAJ-018', fecha: '31 oct', esperado: '$2,240.00', contado: '$2,000.00', dif: '−$240.00', estado: 'Faltante' },
    { codigo: 'CAJ-017', fecha: '30 oct', esperado: '$1,860.00', contado: '$1,860.00', dif: '$0.00', estado: 'Cuadrada' },
    { codigo: 'CAJ-016', fecha: '29 oct', esperado: '$1,520.00', contado: '$1,700.00', dif: '+$180.00', estado: 'Sobrante' },
    { codigo: 'CAJ-015', fecha: '28 oct', esperado: '—', contado: '—', dif: '—', estado: 'Abierta' },
    { codigo: 'CAJ-014', fecha: '27 oct', esperado: '$2,080.00', contado: '$1,910.00', dif: '−$170.00', estado: 'Faltante' },
  ];

  readonly movimientos = [
    { codigo: 'MOVC-0107', fecha: '31 oct', motivo: 'Salida · Corrección de error', monto: '−$60.00', origen: 'AUTO' },
    { codigo: 'MOVC-0106', fecha: '28 oct', motivo: 'Entrada · Ingreso manual', monto: '+$120.00', origen: 'MANUAL' },
    { codigo: 'MOVC-0105', fecha: '24 oct', motivo: 'Salida · Gasto en efectivo', monto: '−$250.00', origen: 'MANUAL' },
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

  verSesion(codigo: string): void {
    this.aviso.set(`ToDo CAJ-08: detalle de la sesión ${codigo} pendiente de implementar.`);
  }

  volver(): void {
    this.router.navigate(['/reportes']);
  }
}
