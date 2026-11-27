import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmSwitchComponent } from '../../../../shared/components/atoms/switch/sgfidm-switch.component';
import {
  ExportarModalComponent,
  ExportacionSolicitud,
} from '../exportar-modal/exportar-modal.component';
import { registrarExportacion } from '../exportar-modal/exportar.utils';

/**
 * REP-06 — Reportes: Exportaciones (historial y configuración), modo Solo.
 * Canon Figma 1045:139955. Solo metadatos: los archivos no se almacenan (spec §12.2).
 *
 * ToDo: REP-07 regeneración/exportación real y descarga de archivos.
 */
@Component({
  standalone: true,
  imports: [
    FormsModule,
    SgfidmPanelCardComponent,
    SgfidmButtonComponent,
    SgfidmSwitchComponent,
    ExportarModalComponent,
  ],
  selector: 'sgfidm-exportaciones',
  templateUrl: './exportaciones.component.html',
  styleUrl: './exportaciones.component.scss',
})
export class ExportacionesComponent {
  private readonly router = inject(Router);

  readonly formato = signal('Excel');
  readonly separador = signal('Coma');
  readonly siempreActivo = signal(true);
  readonly guardado = signal(false);
  readonly regenerando = signal<string | null>(null);

  readonly exportaciones = [
    { id: 'EXP-014', descripcion: 'Ventas · Oct · Centro · Efectivo', fecha: '05 nov', reporte: 'Ventas', formato: 'XLSX', estado: 'COMPLETADA' },
    { id: 'EXP-013', descripcion: 'Inventario · Oct · Todas · Activos', fecha: '04 nov', reporte: 'Inventario', formato: 'CSV', estado: 'COMPLETADA' },
    { id: 'EXP-012', descripcion: 'Finanzas · Oct · Todas · Todos', fecha: '02 nov', reporte: 'Finanzas', formato: 'XLSX', estado: 'FALLIDA' },
    { id: 'EXP-011', descripcion: 'Caja · Sep · Centro', fecha: '28 oct', reporte: 'Caja', formato: 'CSV', estado: 'COMPLETADA' },
    { id: 'EXP-010', descripcion: 'Ventas · Sep · Centro · Tarjeta', fecha: '21 oct', reporte: 'Ventas', formato: 'XLSX', estado: 'EXPIRADA' },
  ];

  guardar(): void {
    this.guardado.set(true);
  }

  regenerar(id: string): void {
    this.regenerando.set(id);
  }

  cerrarExportar(): void {
    this.regenerando.set(null);
  }

  confirmarExportar(solicitud: ExportacionSolicitud): void {
    registrarExportacion(solicitud);
    this.regenerando.set(null);
  }

  volver(): void {
    this.router.navigate(['/reportes']);
  }
}
