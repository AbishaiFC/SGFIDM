import { Component, inject, input } from '@angular/core';
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
