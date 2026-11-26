import { Component, computed, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

/** DTO para indicadores del dashboard (unifica la interfaz de datos). */
export interface IndicatorDto {
  eyebrow: string;
  value: string;
  delta: string;
}

/**
 * SgfidmDashboardOrganism — Dashboard operativo (INICIO-03, Figma 1045:123202).
 *
 * Compone estado de caja, indicadores, alertas "Requiere tu atención",
 * actividad reciente y acciones rápidas usando moléculas del Design System.
 */
@Component({
  selector: 'sgfidm-dashboard-organism',
  standalone: true,
  imports: [
    SgfidmIndicatorCardComponent,
    SgfidmPanelCardComponent,
    SgfidmButtonComponent,
  ],
  templateUrl: './sgfidm-dashboard-organism.component.html',
  styleUrl: './sgfidm-dashboard-organism.component.scss',
})
export class SgfidmDashboardOrganismComponent {
  private readonly router = inject(Router);

  indicators = input<IndicatorDto[]>([]);

  readonly modo = SgfidmDashboardOrganismComponent.leerModo();

  readonly alertas = [
    {
      titulo: 'Productos con bajo stock',
      detalle: '8 productos por debajo del mínimo',
      ruta: '/dashboard',
      accion: 'Ir a Inventario',
    },
    {
      titulo: 'Productos agotados',
      detalle: '3 productos sin existencias',
      ruta: '/dashboard',
      accion: 'Ir a Inventario',
    },
    {
      titulo: 'Caja pendiente de cierre',
      detalle: 'La caja de ayer sigue abierta',
      ruta: '/caja',
      accion: 'Ir a Caja',
    },
  ];

  readonly actividad = [
    { titulo: 'Venta · $340', detalle: 'Ana Martínez · 10:42' },
    { titulo: 'Gasto · $120', detalle: 'Ana Martínez · 09:58' },
    { titulo: 'Inventario · Entrada', detalle: 'Ana Martínez · 09:30' },
  ];

  // INICIO-06 (Solo): drawer de actividad reciente con filtros por tipo de operación.
  readonly actividadAbierta = signal(false);
  readonly filtro = signal<'Todas' | 'Ventas' | 'Gastos' | 'Inventario' | 'Caja'>('Todas');
  readonly filtros = ['Todas', 'Ventas', 'Gastos', 'Inventario', 'Caja'] as const;

  readonly operaciones = [
    { tipo: 'VENTA', titulo: 'Venta de mostrador · 3 artículos', detalle: 'Ana Martínez · 10:42', importe: '$340' },
    { tipo: 'GASTO', titulo: 'Compra de bolsas y empaque', detalle: 'Ana Martínez · 09:58', importe: '−$120' },
    { tipo: 'INVENTARIO', titulo: 'Entrada de 24 unidades · Café molido', detalle: 'Ana Martínez · 09:30', importe: '—' },
    { tipo: 'CAJA', titulo: 'Apertura de caja · Fondo inicial', detalle: 'Ana Martínez · 09:00', importe: '$500' },
    { tipo: 'VENTA', titulo: 'Venta de mostrador · 2 artículos', detalle: 'Ana Martínez · Ayer, 18:12', importe: '$180' },
    { tipo: 'CAJA', titulo: 'Cierre de caja · Sin diferencia', detalle: 'Ana Martínez · Ayer, 20:05', importe: '$0' },
  ];

  readonly operacionesFiltradas = computed(() => {
    const filtro = this.filtro();
    if (filtro === 'Todas') {
      return this.operaciones;
    }
    const tipo = filtro.endsWith('s') ? filtro.slice(0, -1) : filtro;
    return this.operaciones.filter((op) => op.tipo === tipo.toUpperCase());
  });

  abrirActividad(): void {
    this.actividadAbierta.set(true);
  }

  cerrarActividad(): void {
    this.actividadAbierta.set(false);
  }

  seleccionarFiltro(filtro: (typeof this.filtros)[number]): void {
    this.filtro.set(filtro);
  }

  ir(ruta: string): void {
    this.router.navigate([ruta]);
  }

  private static leerModo(): string {
    try {
      const negocio = JSON.parse(localStorage.getItem('sgfidm-negocio') || '{}');
      return negocio.modo === 'solo' ? 'Modo Solo' : 'Modo Con Empleados';
    } catch {
      return 'Modo Con Empleados';
    }
  }
}
