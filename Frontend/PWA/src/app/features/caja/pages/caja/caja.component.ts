import { Component } from '@angular/core';
import { SgfidmCajaOrganismComponent } from '../../../../shared/components/organisms/caja/sgfidm-caja-organism.component';

/** CajaPage — compone el organismo CAJ-01 en modo Solo. */
@Component({
  standalone: true,
  imports: [SgfidmCajaOrganismComponent],
  selector: 'sgfidm-caja',
  styleUrl: './caja.component.scss',
  templateUrl: './caja.component.html',
})
export class CajaComponent {}
