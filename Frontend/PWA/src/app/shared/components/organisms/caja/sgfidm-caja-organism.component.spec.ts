import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { SgfidmCajaOrganismComponent } from './sgfidm-caja-organism.component';

describe('SgfidmCajaOrganismComponent (CAJ-01 Solo)', () => {
  let fixture: ComponentFixture<SgfidmCajaOrganismComponent>;
  let component: SgfidmCajaOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SgfidmCajaOrganismComponent,
        RouterTestingModule.withRoutes([
          { path: 'pos', component: SgfidmCajaOrganismComponent },
          { path: 'dashboard', component: SgfidmCajaOrganismComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmCajaOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the Solo cash header and active session', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Caja');
    expect(text).toContain('Mi negocio · 1 sesión activa');
    expect(text).toContain('MI SESIÓN DE CAJA');
    expect(text).toContain('Abierta');
    expect(text).toContain('CAJ-002');
    expect(text).toContain('$1,500.00');
    expect(text).toContain('14 operaciones');
    expect(text).toContain('$4,820.00');
    expect(text).toContain('Ver sesión');
    expect(text).toContain('Cerrar caja');
  });

  it('should render the last five closures', () => {
    expect(component.cierres.length).toBe(5);
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('ÚLTIMOS 5 CIERRES');
    expect(text).toContain('Cuadrada');
    expect(text).toContain('Sobrante');
    expect(text).toContain('Faltante');
    expect(text).toContain('Ver historial completo →');
  });

  it('should navigate to POS and dashboard', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.ir('/pos');
    expect(spy).toHaveBeenCalledWith(['/pos']);
    component.ir('/dashboard');
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });
});
