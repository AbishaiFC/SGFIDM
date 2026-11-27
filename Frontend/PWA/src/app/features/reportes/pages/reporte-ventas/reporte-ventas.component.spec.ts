import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ReporteVentasComponent } from './reporte-ventas.component';

describe('ReporteVentasComponent (REP-02 Solo)', () => {
  let fixture: ComponentFixture<ReporteVentasComponent>;
  let component: ReporteVentasComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReporteVentasComponent,
        RouterTestingModule.withRoutes([{ path: 'reportes', component: ReporteVentasComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical sales report', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PANTALLA REP-02 · REPORTE DE VENTAS · SOLO CONSULTA');
    expect(text).toContain('CONTEXTO DE LA CONSULTA');
    expect(text).toContain('$184,560.00');
    expect(text).toContain('1,284');
    expect(text).toContain('DESGLOSE POR MÉTODO DE PAGO');
    expect(text).toContain('53.3%');
    expect(text).toContain('DESGLOSE POR PRODUCTO');
    expect(text).toContain('Grano de café');
    expect(text).toContain('DETALLE DE VENTAS');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-indicator-card')).toHaveLength(6);
  });

  it('should collapse and expand the sales detail', () => {
    component.detalleAbierto.set(false);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).not.toContain('VTA-00231');
    component.detalleAbierto.set(true);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('VTA-00231');
  });

  it('should return to the reports center', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/reportes']);
    spy.mockRestore();
  });
});
