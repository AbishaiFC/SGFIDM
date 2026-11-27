import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/** CAJ-03 Cerrar caja con arqueo — modo Solo (Figma 1145:82530). */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, FormsModule, SgfidmPanelCardComponent, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-cerrar-caja',
  styleUrl: './cerrar-caja.component.scss',
  templateUrl: './cerrar-caja.component.html',
})
export class CerrarCajaComponent {
  private readonly router = inject(Router);

  readonly resumen = [
    { label: 'Fondo inicial de apertura', value: '$1,500.00' },
    { label: '(+) Ventas en efectivo (POS)', value: '+$3,120.00' },
    { label: 'Ventas con tarjeta / transferencia (Informativo)', value: '$1,850.00', info: true },
    { label: '(+) Entradas manuales de efectivo', value: '+$400.00' },
    { label: '(−) Cancelaciones en efectivo (POS)', value: '−$0.00' },
    { label: '(−) Reembolsos en efectivo (POS)', value: '−$100.00' },
    { label: '(−) Salidas manuales de efectivo', value: '−$100.00' },
  ];

  readonly esperado = 4820;
  readonly contado = signal('4,820.00');
  motivo = 'Sin diferencia (Caja cuadrada a centavos)';
  notas = 'Cierre de turno matutino sin incidencias.';
  confirmado = false;
  readonly error = signal('');

  readonly diferencia = computed(() => {
    const contado = Number(this.contado().replace(/,/g, ''));
    return Number.isFinite(contado) ? contado - this.esperado : 0;
  });

  get esCuadrada(): boolean {
    return this.diferencia() === 0;
  }

  get notasLength(): number {
    return this.notas.length;
  }

  numero(valor: number): string {
    return `$${Math.abs(valor).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  onCerrar(): void {
    const contado = Number(this.contado().replace(/,/g, ''));
    if (!Number.isFinite(contado) || contado < 0) {
      this.error.set('Ingresa un efectivo físico contado válido.');
      return;
    }
    if (!this.esCuadrada && !this.motivo.trim()) {
      this.error.set('El motivo de diferencia es requerido.');
      return;
    }
    if (!this.confirmado) {
      this.error.set('Debes confirmar el conteo antes de cerrar.');
      return;
    }

    try {
      localStorage.setItem(
        'sgfidm-caja-cerrada',
        JSON.stringify({ contado, diferencia: this.diferencia(), notas: this.notas }),
      );
      localStorage.removeItem('sgfidm-caja-abierta');
    } catch {
      // Sin almacenamiento: se mantiene el estado en memoria.
    }
    this.router.navigate(['/caja']);
  }

  onCancelar(): void {
    this.router.navigate(['/caja']);
  }
}
