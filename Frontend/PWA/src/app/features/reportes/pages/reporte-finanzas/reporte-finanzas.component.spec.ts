import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ReporteFinanzasComponent } from './reporte-finanzas.component';

describe('ReporteFinanzasComponent (REP-05 Solo)', () => {
  let fixture: ComponentFixture<ReporteFinanzasComponent>;
  let component: ReporteFinanzasComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReporteFinanzasComponent,
        RouterTestingModule.withRoutes([{ path: 'reportes', component: ReporteFinanzasComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReporteFinanzasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical finance report', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PANTALLA REP-05 · REPORTE DE FINANZAS · SOLO CONSULTA');
    expect(text).toContain('RESULTADO COMERCIAL');
    expect(text).toContain('$128,450');
    expect(text).toContain('Estimada');
    expect(text).toContain('FLUJO DE EFECTIVO');
    expect(text).toContain('+$18,650.00');
    expect(text).toContain('no están vinculados a una caja');
    expect(text).toContain('DESGLOSE DE INGRESOS');
    expect(text).toContain('DESGLOSE DE GASTOS');
    expect(text).toContain('DETALLE DE MOVIMIENTOS FINANCIEROS');
    expect(text).toContain('GAS-00048');
  });

  it('should show a ToDo when opening a movement', () => {
    component.verDetalle('VTA-00231');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('POS-06');
  });

  it('should return to the reports center', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/reportes']);
    spy.mockRestore();
  });
});
