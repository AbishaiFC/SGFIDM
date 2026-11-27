import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmChipComponent } from '../../../../shared/components/atoms/chip/sgfidm-chip.component';

/**
 * INV-08 — Inventario: Alertas de stock (Módulo 05), modo Solo.
 * Canon Figma 1045:129243. Sin sucursal: alertas globales del negocio.
 *
 * ToDo: INV-05 ajustes, INV-06/07 transferencias y filtros por rol de otros modos.
 */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, SgfidmPanelCardComponent, SgfidmChipComponent],
  selector: 'sgfidm-alertas-stock',
  templateUrl: './alertas-stock.component.html',
  styleUrl: './alertas-stock.component.scss',
})
export class AlertasStockComponent {
  private readonly router = inject(Router);

  readonly vista = signal<'Agotados' | 'Bajo stock'>('Agotados');

  readonly agotados = [
    { nombre: 'Taza térmica', codigo: 'PROD-022', minimo: 2, entrada: '06 nov · +8' },
    { nombre: 'Filtro de agua', codigo: 'PROD-043', minimo: 4, entrada: '05 nov · +6' },
  ];

  readonly bajoStock = [
    { nombre: 'Grano de café', codigo: 'PROD-019', actual: 3, minimo: 8, deficit: 5 },
    { nombre: 'Leche entera', codigo: 'PROD-041', actual: 2, minimo: 6, deficit: 4 },
  ];

  abrir(codigo: string): void {
    this.router.navigate(['/inventario', codigo]);
  }
}
