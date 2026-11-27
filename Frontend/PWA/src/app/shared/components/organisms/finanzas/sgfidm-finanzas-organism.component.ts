import { SgfidmIconComponent } from './../../atoms/icon/sgfidm-icon.component';
import { Component, output, signal } from '@angular/core';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

interface Fila {
  titulo: string;
  detalle: string;
  valor: string;
  negativo?: boolean;
  total?: boolean;
}

interface Categoria {
  nombre: string;
  monto: string;
  porcentaje: string;
  ancho: number;
}

/**
 * SgfidmFinanzasOrganism — Resumen financiero (FIN-01, Módulo 08) en modo Solo.
 * Canon adaptado del prototipo Figma 1045:120710 (Con Empleados): sin sucursal
 * ni filtros por EMP-XXX. Compone PanelCard, IndicatorCard y Button del DS.
 *
 * ToDo: FIN-02..10 (ingresos, gastos, movimientos, análisis, categorías),
 * vinculación retroactiva de gastos no vinculados a caja.
 */
@Component({
  selector: 'sgfidm-finanzas-organism',
  standalone: true,
  imports: [SgfidmIconComponent, SgfidmPanelCardComponent, SgfidmIndicatorCardComponent, SgfidmButtonComponent],
  templateUrl: './sgfidm-finanzas-organism.component.html',
  styleUrl: './sgfidm-finanzas-organism.component.scss',
})
export class SgfidmFinanzasOrganismComponent {
  readonly periodos = ['Hoy', 'Semana', 'Este mes', 'Mes anterior'];
  readonly periodo = signal('Este mes');

  readonly indicadores = [
    { eyebrow: 'INGRESOS TOTALES (VENTAS + EXTRAORD.)', value: '$128,450.00', delta: '↑ +12.4% vs mes anterior' },
    { eyebrow: 'GASTOS TOTALES DEL NEGOCIO', value: '$34,200.00', delta: '↓ -3.1% vs mes anterior' },
    { eyebrow: 'UTILIDAD NETA COMERCIAL', value: '$42,150.00', delta: 'Estimada · ↑ +8.5% (Margen: 32.8%)' },
    { eyebrow: 'FLUJO DE EFECTIVO NETO (CAJA)', value: '+$18,650.00', delta: 'Dinero físico neto en caja' },
  ];

  readonly comercial: Fila[] = [
    { titulo: 'Ingresos por ventas (POS)', detalle: 'Neto de cancelaciones y devoluciones', valor: '$118,450.00' },
    { titulo: 'Ingresos manuales extraordinarios (ING)', detalle: 'Venta de activos, préstamos recibidos', valor: '+$10,000.00' },
    { titulo: 'Costo de mercancía vendida (CMV)', detalle: 'Costo congelado de productos vendidos', valor: '-$52,100.00', negativo: true },
    { titulo: 'Utilidad bruta comercial', detalle: 'Margen bruto: 59.4% (Ingresos − CMV)', valor: '$76,350.00', total: true },
    { titulo: 'Gastos operativos del periodo (GAS)', detalle: 'Salidas operativas del negocio', valor: '-$34,200.00', negativo: true },
  ];

  readonly efectivo: Fila[] = [
    { titulo: 'Entradas totales de efectivo en caja', detalle: 'Ventas efvo ($58.2k) + Ingresos efvo ($4k) + Manuales caja ($2k)', valor: '+$64,200.00' },
    { titulo: 'Salidas totales de efectivo en caja', detalle: 'Gastos efvo ($38.3k) + Devoluc. ($1.3k) + Salidas caja ($8k)', valor: '-$45,550.00', negativo: true },
    { titulo: 'Flujo de efectivo neto en el periodo', detalle: 'Diferencia neta física que ingresó a cajas activas', valor: '+$18,650.00', total: true },
  ];

  readonly categorias: Categoria[] = [
    { nombre: 'Insumos y materia prima', monto: '$14,800.00', porcentaje: '43.3%', ancho: 92 },
    { nombre: 'Servicios básicos', monto: '$8,200.00', porcentaje: '24.0%', ancho: 51 },
    { nombre: 'Mantenimiento y reparaciones', monto: '$5,600.00', porcentaje: '16.4%', ancho: 35 },
    { nombre: 'Sin categoría (Gastos libres)', monto: '$5,600.00', porcentaje: '16.3%', ancho: 34 },
  ];

  readonly verMovimientos = output<void>();
  readonly registrarGasto = output<void>();
  readonly registrarIngreso = output<void>();
  readonly analisis = output<void>();
  readonly categoriasFinancieras = output<void>();
  readonly gestionarCategorias = output<void>();

  seleccionar(periodo: string): void {
    this.periodo.set(periodo);
  }
}
