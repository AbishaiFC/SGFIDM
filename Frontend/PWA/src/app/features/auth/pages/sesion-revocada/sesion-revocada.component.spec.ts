import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { SesionRevocadaComponent } from './sesion-revocada.component';

describe('SesionRevocadaComponent (AUTH-17)', () => {
  let fixture: ComponentFixture<SesionRevocadaComponent>;
  let component: SesionRevocadaComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SesionRevocadaComponent,
        RouterTestingModule.withRoutes([
          { path: 'auth/employee/login', component: SesionRevocadaComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SesionRevocadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and communicate the three key facts', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Sesión revocada');
    expect(text).toContain('La sesión dejó de ser válida.');
    expect(text).toContain('La venta está protegida');
    expect(text).toContain('Vuelve a autenticarte para recuperarla');
    expect(text).toContain('El PIN de acceso rápido no puede recuperar una sesión revocada.');
  });

  it('should show the pending operation without sensitive sale data', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('VTA-PEND-0042');
    expect(text).toContain('Operación pendiente · carrito conservado');
    expect(text).toContain('no se asume su resultado');
  });

  it('should require full authentication to recover the operation', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onReautenticar();
    expect(spy).toHaveBeenCalledWith(['/auth/employee/login']);
    spy.mockRestore();
  });
});
