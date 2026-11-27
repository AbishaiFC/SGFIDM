import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { RegistrarMovimientoComponent } from './registrar-movimiento.component';

describe('RegistrarMovimientoComponent (INV-03 Solo)', () => {
  let fixture: ComponentFixture<RegistrarMovimientoComponent>;
  let component: RegistrarMovimientoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistrarMovimientoComponent,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'inventario', component: RegistrarMovimientoComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('sgfidm-movimientos'));

  it('should render the canonical movement form', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Registrar movimiento');
    expect(text).toContain('Entrada o salida manual');
    expect(text).toContain('Nuevo movimiento');
    expect(text).toContain('Café de altura · PROD-018');
    expect(text).toContain('Compra / reposición');
    expect(text).toContain('EXISTENCIAS RESULTANTES');
    expect(text).toContain('12');
  });

  it('should compute the resulting stock', () => {
    expect(component.resultante()).toBe(12);
    component.elegirTipo('Salida');
    expect(component.resultante()).toBe(0);
  });

  it('should reject a non-positive quantity', () => {
    component.cantidad.set('0');
    component.registrar();
    expect(component.error()).toContain('mayor a cero');
  });

  it('should save the movement and return to the inventory', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.registrar();
    const guardados = JSON.parse(localStorage.getItem('sgfidm-movimientos') || '[]');
    expect(guardados).toHaveLength(1);
    expect(guardados[0].resultante).toBe(12);
    expect(spy).toHaveBeenCalledWith(['/inventario']);
    spy.mockRestore();
  });
});
