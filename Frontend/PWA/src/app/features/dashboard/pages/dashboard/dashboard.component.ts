import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  imports: [CommonModule, MatCardModule],
  selector: 'sgfidm-dashboard',
  styleUrl: './dashboard.component.scss',
  template: `
    <div class="dashboard-page">
      <h1 class="dashboard-title">Dashboard Operativo</h1>
      <p class="dashboard-subtitle">Resumen de indicadores del negocio</p>

      <div class="indicators-grid">
        <mat-card class="indicator-card sgfidm-surface">
          <div class="indicator-label">Ventas del día</div>
          <div class="indicator-value">$ 0.00</div>
          <div class="indicator-delta">Sin ventas registradas hoy</div>
        </mat-card>

        <mat-card class="indicator-card sgfidm-surface">
          <div class="indicator-label">Estado de caja</div>
          <div class="indicator-value">Cerrada</div>
          <div class="indicator-delta">Abre una caja para operar</div>
        </mat-card>

        <mat-card class="indicator-card sgfidm-surface">
          <div class="indicator-label">Productos</div>
          <div class="indicator-value">0</div>
          <div class="indicator-delta">Catálogo vacío</div>
        </mat-card>

        <mat-card class="indicator-card sgfidm-surface">
          <div class="indicator-label">Transacciones</div>
          <div class="indicator-value">0</div>
          <div class="indicator-delta">Sin actividad</div>
        </mat-card>
      </div>
    </div>
  `,
})
export class DashboardComponent {}
