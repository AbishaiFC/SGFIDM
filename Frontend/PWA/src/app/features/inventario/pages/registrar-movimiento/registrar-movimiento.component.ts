import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmFormFieldComponent } from '../../../../shared/components/molecules/form-field/sgfidm-form-field.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

/**
 * INV-03 — Inventario: Registrar movimiento (Módulo 05), modo Solo.
 * Canon Figma 1045:132666. Entrada/salida manual; la existencia cambia solo
 * mediante movimientos inmutables. Sin sucursal ni EMP-XXX.
 *
 * ToDo: INV-04 historial, INV-05 ajustes, INV-06/07 transferencias y motivos
 * adicionales por rol.
 */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, FormsModule, SgfidmPanelCardComponent, SgfidmFormFieldComponent, SgfidmButtonComponent],
  selector: 'sgfidm-registrar-movimiento',
  templateUrl: './registrar-movimiento.component.html',
  styleUrl: './registrar-movimiento.component.scss',
})
export class RegistrarMovimientoComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly tipos = ['Entrada', 'Salida'] as const;
  readonly motivoEntrada = ['Compra / reposición', 'Devolución de cliente', 'Ajuste positivo', 'Inicial'];
  readonly motivoSalida = ['Venta', 'Merma', 'Ajuste negativo', 'Salida manual'];
  readonly productos = ['Café de altura · PROD-018', 'Grano de café · PROD-019', 'Pan artesanal · PROD-031'];

  readonly tipo = signal<'Entrada' | 'Salida'>(
    this.route.snapshot.queryParamMap.get('tipo') === 'salida' ? 'Salida' : 'Entrada',
  );
  readonly producto = signal(this.productos[0]);
  readonly motivo = signal(
    this.route.snapshot.queryParamMap.get('tipo') === 'salida'
      ? this.motivoSalida[0]
      : this.motivoEntrada[0],
  );
  readonly cantidad = signal('6');
  readonly notas = signal('Factura de reposición 0081');
  readonly error = signal('');

  readonly actuales = 6;
  readonly actualesTexto = '6';
  readonly motivos = computed(() => (this.tipo() === 'Entrada' ? this.motivoEntrada : this.motivoSalida));

  readonly cantidadValor = computed(() => Number(this.cantidad().replace(/,/g, '')) || 0);
  readonly resultante = computed(() =>
    this.tipo() === 'Entrada'
      ? this.actuales + this.cantidadValor()
      : this.actuales - this.cantidadValor(),
  );

  elegirTipo(tipo: 'Entrada' | 'Salida'): void {
    this.tipo.set(tipo);
    this.motivo.set((tipo === 'Entrada' ? this.motivoEntrada : this.motivoSalida)[0]);
    this.error.set('');
  }

  registrar(): void {
    if (this.cantidadValor() <= 0) {
      this.error.set('La cantidad debe ser mayor a cero.');
      return;
    }
    if (this.resultante() < 0) {
      this.error.set('La salida no puede dejar existencias negativas.');
      return;
    }
    try {
      const movimientos = JSON.parse(localStorage.getItem('sgfidm-movimientos') || '[]');
      localStorage.setItem(
        'sgfidm-movimientos',
        JSON.stringify([
          ...movimientos,
          {
            producto: this.producto(),
            tipo: this.tipo(),
            motivo: this.motivo(),
            cantidad: this.cantidadValor(),
            notas: this.notas(),
            resultante: this.resultante(),
          },
        ]),
      );
    } catch {
      // Sin almacenamiento: el movimiento queda solo en memoria.
    }
    this.cancelar();
  }

  cancelar(): void {
    this.router.navigate(['/inventario']);
  }
}
