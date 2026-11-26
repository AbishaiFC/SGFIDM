import { Component } from '@angular/core';
import { SgfidmPosTerminalOrganismComponent } from '../../../../shared/components/organisms/pos-terminal/sgfidm-pos-terminal-organism.component';

/**
 * PosTerminalPage — compone el organismo POS-01 (modo Solo, sucursal implícita).
 * La lógica del carrito y los totales vive en el organismo del Design System.
 */
@Component({
  standalone: true,
  imports: [SgfidmPosTerminalOrganismComponent],
  selector: 'sgfidm-pos-terminal',
  styleUrl: './pos-terminal.component.scss',
  templateUrl: './pos-terminal.component.html',
})
export class PosTerminalComponent {}
