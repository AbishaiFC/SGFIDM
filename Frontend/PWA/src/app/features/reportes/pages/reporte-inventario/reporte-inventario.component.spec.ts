import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ReporteInventarioComponent } from './reporte-inventario.component';

describe('ReporteInventarioComponent (REP-03 Solo)', () => {
  let fixture: ComponentFixture<ReporteInventarioComponent>;
  let component: ReporteInventarioComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReporteInventarioComponent,
        RouterTestingModule.withRoutes([{ path: 'reportes', component: ReporteInventarioComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical inventory report', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PANTALLA REP-03 · REPORTE DE INVENTARIO · SOLO CONSULTA');
    expect(text).toContain('CONTEXTO DE LA CONSULTA');
    expect(text).toContain('1,240 uds');
    expect(text).toContain('$186,400.00');
    expect(text).toContain('DESGLOSE POR SUCURSAL');
    expect(text).toContain('ALERTAS DE STOCK');
    expect(text).toContain('EXISTENCIAS POR PRODUCTO');
    expect(text).toContain('MOVIMIENTOS DEL PERIODO');
    expect(text).toContain('Sin comparativo entre sucursales (Modo Solo)');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-indicator-card')).toHaveLength(6);
  });

  it('should return to the reports center', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/reportes']);
    spy.mockRestore();
  });
});
