import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ReporteCajaComponent } from './reporte-caja.component';

describe('ReporteCajaComponent (REP-04 Solo)', () => {
  let fixture: ComponentFixture<ReporteCajaComponent>;
  let component: ReporteCajaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReporteCajaComponent,
        RouterTestingModule.withRoutes([{ path: 'reportes', component: ReporteCajaComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical cash report', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PANTALLA REP-04 · REPORTE DE CAJA · SOLO CONSULTA');
    expect(text).toContain('CONTEXTO DE LA CONSULTA');
    expect(text).toContain('SESIONES CERRADAS');
    expect(text).toContain('−$340.00');
    expect(text).toContain('DESGLOSE POR SUCURSAL');
    expect(text).toContain('SESIONES DEL PERIODO');
    expect(text).toContain('CAJ-018');
    expect(text).toContain('Faltante');
    expect(text).toContain('MOVIMIENTOS DEL PERIODO');
    expect(text).toContain('MOVC-0107');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-indicator-card')).toHaveLength(7);
  });

  it('should show a ToDo when opening a session', () => {
    component.verSesion('CAJ-018');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('CAJ-08');
  });

  it('should return to the reports center', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/reportes']);
    spy.mockRestore();
  });
});
