import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/** CAJ-02 Abrir caja — nueva sesión de caja en modo Solo (Figma 1145:86450). */
@Component({
  standalone: true,
  imports: [FormsModule, SgfidmPanelCardComponent, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-abrir-caja',
  styleUrl: './abrir-caja.component.scss',
  templateUrl: './abrir-caja.component.html',
})
export class AbrirCajaComponent {
  private readonly router = inject(Router);

  readonly negocio = 'Mi negocio';
  readonly cajero = 'Ana Martínez · Propietaria';

  fondo = '1,500.00';
  notas = 'Fondo compuesto por 10 billetes de $100 y 10 de $50 para cambio inicial en caja.';
  readonly maxNotas = 200;
  readonly error = signal('');

  get notasLength(): number {
    return this.notas.length;
  }

  get fondoValido(): boolean {
    const valor = Number(this.fondo.replace(/,/g, ''));
    return Number.isFinite(valor) && valor >= 0;
  }

  onAbrir(): void {
    if (!this.fondoValido) {
      this.error.set('Ingresa un fondo inicial válido.');
      return;
    }

    try {
      localStorage.setItem(
        'sgfidm-caja-abierta',
        JSON.stringify({ fondo: Number(this.fondo.replace(/,/g, '')), notas: this.notas }),
      );
    } catch {
      // Sin almacenamiento: la navegación continúa con el estado en memoria.
    }
    this.router.navigate(['/caja']);
  }

  onCancelar(): void {
    this.router.navigate(['/caja']);
  }
}
