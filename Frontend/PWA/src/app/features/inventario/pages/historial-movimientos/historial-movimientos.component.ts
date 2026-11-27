import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmSearchBarComponent } from '../../../../shared/components/molecules/search-bar/sgfidm-search-bar.component';
import { SgfidmPaginationComponent } from '../../../../shared/components/molecules/pagination/sgfidm-pagination.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Movimiento {
  fecha: string;
  codigo: string;
  tipo: string;
  producto: string;
  cantidad: string;
  notas: string;
}

/**
 * INV-04 — Inventario: Historial de movimientos (Módulo 05), modo Solo.
 * Canon Figma 1045:131543. Registros inmutables, orden descendente.
 *
 * ToDo: exportación real (REP-07), filtros por empleado/sucursal de otros modos.
 */
@Component({
  standalone: true,
  imports: [
    FormsModule,
    SgfidmPanelCardComponent,
    SgfidmSearchBarComponent,
    SgfidmPaginationComponent,
    SgfidmButtonComponent,
  ],
  selector: 'sgfidm-historial-movimientos',
  templateUrl: './historial-movimientos.component.html',
  styleUrl: './historial-movimientos.component.scss',
})
export class HistorialMovimientosComponent {
  readonly busqueda = signal('');
  readonly tipo = signal('Todos los tipos');
  readonly periodo = signal('Últimos 30 días');
  readonly pagina = signal(1);
  readonly aviso = signal('');

  readonly tipos = ['Todos los tipos', 'Entrada', 'Salida', 'Ajuste'];
  readonly periodos = ['Últimos 30 días', 'Últimos 7 días', 'Todo el periodo'];

  readonly movimientos: Movimiento[] = [
    { fecha: '09 nov · 11:20', codigo: 'MOV-381', tipo: 'Entrada · Compra', producto: 'Café de altura · PROD-018', cantidad: '+6 / 12', notas: 'Factura 0081' },
    { fecha: '09 nov · 10:12', codigo: 'MOV-380', tipo: 'Salida · Venta', producto: 'Café de altura · PROD-018', cantidad: '−2 / 11', notas: 'POS-081' },
    { fecha: '08 nov · 16:02', codigo: 'MOV-378', tipo: 'Salida · Venta', producto: 'Grano café · PROD-019', cantidad: '−1 / 3', notas: 'POS-081' },
    { fecha: '08 nov · 12:42', codigo: 'MOV-377', tipo: 'Ajuste · Conteo', producto: 'Grano café · PROD-019', cantidad: '±1 / 3', notas: 'Conteo físico' },
    { fecha: '07 nov · 09:30', codigo: 'MOV-374', tipo: 'Entrada · Inventario inicial', producto: 'Taza térmica · PROD-022', cantidad: '+4 / 9', notas: 'Apertura de inventario' },
    { fecha: '07 nov · 08:15', codigo: 'MOV-373', tipo: 'Entrada · Devolución', producto: 'Taza térmica · PROD-022', cantidad: '+1 / 5', notas: 'Devolución de cliente' },
  ];

  readonly filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const tipo = this.tipo();
    return this.movimientos.filter((m) => {
      const texto =
        !q ||
        m.codigo.toLowerCase().includes(q) ||
        m.producto.toLowerCase().includes(q) ||
        m.notas.toLowerCase().includes(q);
      const porTipo = tipo === 'Todos los tipos' || m.tipo.startsWith(tipo);
      return texto && porTipo;
    });
  });

  exportar(): void {
    this.aviso.set('ToDo REP-07: exportación del historial pendiente de implementar.');
  }
}
