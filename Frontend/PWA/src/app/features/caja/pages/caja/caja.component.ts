import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SgfidmCajaOrganismComponent,
  CajaSessionDto,
} from '../../../../shared/components/organisms/caja/sgfidm-caja-organism.component';

const DEFAULT_SESSIONS: CajaSessionDto[] = [
  { id: 'CAJ-001', sucursal: 'Principal', totalVenta: '$ 0.00', status: 'activa' },
  { id: 'CAJ-002', sucursal: 'Secundaria', totalVenta: '$ 1,200.00', status: 'cerrada' },
  { id: 'CAJ-003', sucursal: 'Lote premium', totalVenta: '$ 0.00', status: 'huérfana' },
];

/**
 * CajaPage — Plantilla de la Hub de Estado de Cajas (CAJ-01) del Design System SGFIDM.
 *
 * Plantilla (template): compone el organismo SgfidmCajaOrganismComponent y pasa
 * las sesiones por defecto del negocio.
 *
 * Uso:
 *   <sgfidm-caja />
 */
@Component({
  standalone: true,
  imports: [CommonModule, SgfidmCajaOrganismComponent],
  selector: 'sgfidm-caja',
  styleUrl: './caja.component.scss',
  templateUrl: './caja.component.html',
})
export class CajaComponent {
  readonly sessions = DEFAULT_SESSIONS;
}
