import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'sgfidm-pos-terminal',
  styleUrl: './pos-terminal.component.scss',
  template: `
    <div class="pos-page">
      <h1 class="pos-title">Punto de Venta</h1>
      <p class="pos-subtitle">Terminal de venta — POS-01</p>

      <div class="pos-layout">
        <div class="pos-cart-column">
          <mat-card class="sgfidm-surface">
            <div class="cart-header">Carrito (0 productos)</div>
            <div class="cart-empty">Escanea o busca productos para comenzar</div>
          </mat-card>
        </div>

        <div class="pos-totals-column">
          <mat-card class="sgfidm-surface">
            <div class="totals-header">Resumen de venta</div>
            <div class="totals-line">
              <span>Subtotal</span>
              <span class="totals-value">$0.00</span>
            </div>
            <div class="totals-line">
              <span>Descuento</span>
              <span class="totals-value">$0.00</span>
            </div>
            <div class="totals-divider"></div>
            <div class="totals-line totals-total">
              <span>TOTAL</span>
              <span class="totals-value-total">$0.00</span>
            </div>
            <button mat-raised-button color="primary" class="pagar-btn" disabled>
              Pagar (F9)
            </button>
          </mat-card>
        </div>
      </div>
    </div>
  `,
})
export class PosTerminalComponent {}
