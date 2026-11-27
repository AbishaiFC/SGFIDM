import { SgfidmIconComponent } from './../../../../shared/components/atoms/icon/sgfidm-icon.component';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Sucursal {
  id: string;
  nombre: string;
  detalle: string;
}

/** AUTH-13 — Selección de sucursal activa (paso tras el login para empleados con 2+ sucursales). */
@Component({
  standalone: true,
  imports: [SgfidmIconComponent, SgfidmButtonComponent],
  selector: 'sgfidm-select-branch',
  styleUrl: './select-branch.component.scss',
  templateUrl: './select-branch.component.html',
})
export class SelectBranchComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /** El propietario usa el selector como filtro de consulta (Figma), no como contexto operativo. */
  readonly esFiltro = this.route.snapshot.queryParamMap.get('modo') === 'filtro';
  readonly sucursales: Sucursal[] = [
    { id: 'SUC-001', nombre: 'Matriz', detalle: 'Av. Principal 123 · Caja 1' },
    { id: 'SUC-002', nombre: 'Sucursal Norte', detalle: 'Blvd. Norte 45 · Caja 2' },
    { id: 'SUC-003', nombre: 'Sucursal Sur', detalle: 'Calle Sur 78 · Caja 3' },
  ];

  seleccionada = '';

  get subtitulo(): string {
    return this.esFiltro
      ? 'Filtro de consulta, no contexto operativo'
      : 'Selecciona la sucursal activa con la que vas a operar.';
  }

  seleccionar(id: string): void {
    this.seleccionada = id;
  }

  onContinuar(): void {
    if (!this.seleccionada) {
      return;
    }
    this.router.navigate(['/dashboard'], {
      state: { sucursalActiva: this.seleccionada },
    });
  }

  onVolver(): void {
    this.router.navigate(['/dashboard/configuracion']);
  }
}
