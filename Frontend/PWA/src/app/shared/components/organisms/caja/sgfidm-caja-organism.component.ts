import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../atoms/button/sgfidm-button.component';

/** DTO de cierre conservado por compatibilidad con usos previos. */
export interface CajaSessionDto {
  id: string;
  sucursal: string;
  totalVenta: string;
  status: string;
}

/**
 * SgfidmCajaOrganism — Vista CAJ-01 de Caja en modo Solo (Figma 1145:83635).
 *
 * Sucursal implícita SUC-001, una sola sesión activa del propietario y
 * historial de cierres. Sin selector de sucursal ni filtro por empleado.
 */
@Component({
  selector: 'sgfidm-caja-organism',
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmButtonComponent],
  templateUrl: './sgfidm-caja-organism.component.html',
  styleUrl: './sgfidm-caja-organism.component.scss',
})
export class SgfidmCajaOrganismComponent {
  private readonly router = inject(Router);

  readonly cierres = [
    { id: 'CAJ-001', empleado: 'Ana Martínez', fecha: 'Ayer · 06:30 PM', esperado: '$6,200.00', contado: '$6,200.00', resultado: 'Cuadrada', diferencia: '$0.00' },
    { id: 'CAJ-098', empleado: 'Ana Martínez', fecha: '08/11 · 07:15 PM', esperado: '$4,100.00', contado: '$4,150.00', resultado: 'Sobrante', diferencia: '+$50.00' },
    { id: 'CAJ-095', empleado: 'Ana Martínez', fecha: '07/11 · 06:45 PM', esperado: '$5,800.00', contado: '$5,780.00', resultado: 'Faltante', diferencia: '−$20.00' },
    { id: 'CAJ-091', empleado: 'Ana Martínez', fecha: '06/11 · 07:00 PM', esperado: '$3,950.00', contado: '$3,950.00', resultado: 'Cuadrada', diferencia: '$0.00' },
    { id: 'CAJ-087', empleado: 'Ana Martínez', fecha: '05/11 · 06:30 PM', esperado: '$5,120.00', contado: '$5,120.00', resultado: 'Cuadrada', diferencia: '$0.00' },
  ];

  ir(ruta: string): void {
    this.router.navigate([ruta]);
  }
}
