import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SgfidmPanelCardComponent } from '../../../../shared/components/molecules/panel-card/sgfidm-panel-card.component';
import { SgfidmButtonComponent } from '../../../../shared/components/atoms/button/sgfidm-button.component';

interface Paso {
  numero: number;
  titulo: string;
  descripcion: string;
  ruta?: string;
}

/** INICIO-02 — Dashboard de primeros pasos (estado pending_first_sale, §3.1). */
@Component({
  standalone: true,
  imports: [SgfidmPanelCardComponent, SgfidmButtonComponent],
  selector: 'sgfidm-primeros-pasos',
  styleUrl: './primeros-pasos.component.scss',
  templateUrl: './primeros-pasos.component.html',
})
export class PrimerosPasosComponent {
  private readonly router = inject(Router);

  readonly pasos: Paso[] = [
    {
      numero: 1,
      titulo: 'Agrega tu primer producto',
      descripcion: 'Crea el catálogo mínimo para poder vender.',
      ruta: '/productos/registrar',
    },
    {
      numero: 2,
      titulo: 'Abre tu caja',
      descripcion: 'Registra el fondo inicial y empieza la jornada.',
      ruta: '/caja/abrir',
    },
    {
      numero: 3,
      titulo: 'Registra tu primera venta',
      descripcion: 'Al confirmarla, el panel pasa a modo operativo.',
      ruta: '/pos',
    },
    {
      numero: 4,
      titulo: 'Registra tu primer gasto',
      descripcion: 'Recomendado; no es obligatorio para operar.',
    },
  ];

  readonly completados = signal<number[]>(PrimerosPasosComponent.leerCompletados());
  readonly modo = PrimerosPasosComponent.leerModo();

  get total(): number {
    return this.completados().length;
  }

  get avance(): string {
    if (this.total === 0) {
      return 'Aún no hay progreso registrado';
    }
    const siguiente = this.pasos.find((p) => !this.completados().includes(p.numero));
    return siguiente
      ? `Tu paso ${siguiente.numero} está listo. Continúa con: ${siguiente.titulo}.`
      : '¡Todos los pasos completados! Ya puedes operar con normalidad.';
  }

  estadoPaso(numero: number): 'Completado' | 'Siguiente paso' | 'Pendiente' {
    if (this.completados().includes(numero)) {
      return 'Completado';
    }
    const pendientes = this.pasos.filter((p) => !this.completados().includes(p.numero));
    return pendientes[0]?.numero === numero ? 'Siguiente paso' : 'Pendiente';
  }

  abrirPaso(paso: Paso): void {
    if (paso.ruta) {
      this.router.navigate([paso.ruta]);
      return;
    }
    this.completar(paso.numero);
  }

  completar(numero: number): void {
    if (!this.completados().includes(numero)) {
      this.completados.set([...this.completados(), numero]);
    }
  }

  onOcultarGuia(): void {
    this.router.navigate(['/dashboard']);
  }

  onConfiguracion(): void {
    this.router.navigate(['/dashboard/configuracion']);
  }

  /** INICIO-02: el alta del primer producto (PROD-02) marca el paso 1. */
  private static leerCompletados(): number[] {
    try {
      return localStorage.getItem('sgfidm-primer-producto') === 'true' ? [1] : [];
    } catch {
      return [];
    }
  }

  private static leerModo(): string {
    try {
      const negocio = JSON.parse(localStorage.getItem('sgfidm-negocio') || '{}');
      return negocio.modo === 'solo' ? 'Modo Solo' : 'Modo Con Empleados';
    } catch {
      return 'Modo Con Empleados';
    }
  }
}
