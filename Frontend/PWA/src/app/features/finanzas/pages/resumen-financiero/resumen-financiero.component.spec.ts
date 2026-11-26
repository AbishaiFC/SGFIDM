import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ResumenFinancieroComponent } from './resumen-financiero.component';

describe('ResumenFinancieroComponent (FIN-01 Solo)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ResumenFinancieroComponent,
        RouterTestingModule.withRoutes([
          { path: 'finanzas/gastos/registrar', component: ResumenFinancieroComponent },
        ]),
      ],
    }).compileComponents();
  });

  it('should compose the canonical organism', () => {
    const fixture = TestBed.createComponent(ResumenFinancieroComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('sgfidm-finanzas-organism')).toBeTruthy();
  });

  it('should open the registrar gasto drawer', () => {
    const fixture = TestBed.createComponent(ResumenFinancieroComponent);
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.registrarGasto();
    expect(spy).toHaveBeenCalledWith(['/finanzas/gastos/registrar']);
    spy.mockRestore();
  });

  it('should show a ToDo for unimplemented destinations', () => {
    const fixture = TestBed.createComponent(ResumenFinancieroComponent);
    fixture.componentInstance.pendiente('FIN-07', 'Registrar ingreso manual');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('FIN-07');
  });
});
