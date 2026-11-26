import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SgfidmFinanzasOrganismComponent } from './sgfidm-finanzas-organism.component';

describe('SgfidmFinanzasOrganismComponent (FIN-01 Solo)', () => {
  let fixture: ComponentFixture<SgfidmFinanzasOrganismComponent>;
  let component: SgfidmFinanzasOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmFinanzasOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmFinanzasOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical financial summary', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Resumen financiero');
    expect(text).toContain('Mi negocio · Periodo: Este mes');
    expect(text).toContain('Ver movimientos →');
    expect(text).toContain('$128,450.00');
    expect(text).toContain('$34,200.00');
    expect(text).toContain('$42,150.00');
    expect(text).toContain('+$18,650.00');
    expect(text).toContain('DESGLOSE COMERCIAL');
    expect(text).toContain('DESGLOSE DE FLUJO DE EFECTIVO');
    expect(text).toContain('DESGLOSE DE GASTOS POR CATEGORÍA');
    expect(text).toContain('ACCIONES RÁPIDAS');
    expect(text).toContain('no están vinculados a una sesión de caja');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-indicator-card')).toHaveLength(4);
  });

  it('should switch the period selection', () => {
    component.seleccionar('Hoy');
    fixture.detectChanges();
    expect(component.periodo()).toBe('Hoy');
    const activo = fixture.debugElement.nativeElement.querySelector(
      '.sgfidm-finanzas-organism__periodo--activo',
    );
    expect(activo?.textContent?.trim()).toBe('Hoy');
  });

  it('should emit registrarGasto from the quick actions', () => {
    let emitido = false;
    component.registrarGasto.subscribe(() => (emitido = true));
    const botones: HTMLButtonElement[] = Array.from(
      fixture.debugElement.nativeElement.querySelectorAll('.sgfidm-finanzas-organism__acciones button'),
    );
    const registrar = botones.find((b) => b.textContent?.includes('Registrar gasto')) as HTMLButtonElement;
    registrar.click();
    expect(emitido).toBe(true);
  });
});
