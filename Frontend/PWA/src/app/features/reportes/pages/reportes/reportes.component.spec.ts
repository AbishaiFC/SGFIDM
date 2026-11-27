import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ReportesComponent } from './reportes.component';

describe('ReportesComponent (REP-01 Solo)', () => {
  let fixture: ComponentFixture<ReportesComponent>;
  let component: ReportesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReportesComponent,
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: ReportesComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the Figma reports center', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PANTALLA REP-01 · CENTRO DE REPORTES');
    expect(text).toContain('Reportes');
    expect(text).toContain('Consulta y exporta la información de tu negocio.');
    expect(text).toContain('Historial de exportaciones →');
    expect(text).toContain('REP-02');
    expect(text).toContain('Ventas');
    expect(text).toContain('REP-03');
    expect(text).toContain('Inventario');
    expect(text).toContain('REP-04');
    expect(text).toContain('Caja');
    expect(text).toContain('REP-05');
    expect(text).toContain('Finanzas');
    expect(text).toContain('Abrir reporte →');
    expect(text).toContain('reports.view para consultar');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-panel-card')).toHaveLength(4);
  });

  it('should open the REP-02 sales report from its card', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.abrir('REP-02');
    expect(spy).toHaveBeenCalledWith(['/reportes/ventas']);
    spy.mockRestore();
  });

  it('should open the REP-03 inventory report from its card', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.abrir('REP-03');
    expect(spy).toHaveBeenCalledWith(['/reportes/inventario']);
    spy.mockRestore();
  });

  it('should open the REP-04 cash report from its card', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.abrir('REP-04');
    expect(spy).toHaveBeenCalledWith(['/reportes/caja']);
    spy.mockRestore();
  });

  it('should open the REP-05 finance report from its card', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.abrir('REP-05');
    expect(spy).toHaveBeenCalledWith(['/reportes/finanzas']);
    spy.mockRestore();
  });

  it('should go back to the Inicio dashboard', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.irAlInicio();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });
});
