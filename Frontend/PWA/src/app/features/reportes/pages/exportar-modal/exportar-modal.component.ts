import { Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';
import { SgfidmSwitchComponent } from '../../../../shared/components/atoms/switch/sgfidm-switch.component';

export interface ExportacionSolicitud {
  reporte: string;
  formato: string;
  separador: string;
  incluirTotales: string;
  detalle: string;
  filas: number;
}

/**
 * REP-07 — Modal de exportación compartido por REP-02..REP-05.
 * Canon Figma 1045:140301. Límite de 50,000 filas; reports.export requerido.
 *
 * ToDo: descarga real del archivo CSV/XLSX y registro remoto en REP-06.
 */
@Component({
  standalone: true,
  imports: [FormsModule, SgfidmButtonComponent, SgfidmSwitchComponent],
  selector: 'sgfidm-exportar-modal',
  templateUrl: './exportar-modal.component.html',
  styleUrl: './exportar-modal.component.scss',
})
export class ExportarModalComponent {
  reporte = input('Reporte de ventas');
  codigo = input('REP-02');
  periodo = input('1 oct – 31 oct 2025');
  filtros = input('Método: Efectivo · Estado: Todas');
  filas = input(1284);

  readonly cancelar = output<void>();
  readonly exportar = output<ExportacionSolicitud>();

  readonly formato = signal<'Excel (XLSX)' | 'CSV'>('Excel (XLSX)');
  readonly separador = signal('Coma');
  readonly incluirTotales = signal('Sí');
  readonly detalle = signal('Ambos (indicadores + detalle)');
  readonly contextHeader = signal(true);
  readonly maxFilas = 50000;

  readonly excedeLimite = computed(() => this.filas() > this.maxFilas);

  confirmar(): void {
    if (this.excedeLimite()) {
      return;
    }
    this.exportar.emit({
      reporte: this.reporte(),
      formato: this.formato(),
      separador: this.separador(),
      incluirTotales: this.incluirTotales(),
      detalle: this.detalle(),
      filas: this.filas(),
    });
  }
}
