import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { DetalleExistenciasComponent } from './detalle-existencias.component';

describe('DetalleExistenciasComponent (INV-02 Solo)', () => {
  let fixture: ComponentFixture<DetalleExistenciasComponent>;
  let component: DetalleExistenciasComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetalleExistenciasComponent,
        RouterTestingModule.withRoutes([{ path: 'inventario', component: DetalleExistenciasComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical stock detail', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Café de altura');
    expect(text).toContain('PROD-018 · Código de barras 7501031310012 · Café y té');
    expect(text).toContain('Registrar entrada');
    expect(text).toContain('Registrar salida');
    expect(text).toContain('EXISTENCIAS');
    expect(text).toContain('50.3%');
    expect(text).toContain('Movimientos recientes · últimos 20');
    expect(text).toContain('Salida · Venta');
    expect(fixture.debugElement.nativeElement.querySelectorAll('tbody tr')).toHaveLength(6);
  });

  it('should go back to the inventory list', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/inventario']);
    spy.mockRestore();
  });

  it('should open the movements history', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.verHistorial();
    expect(spy).toHaveBeenCalledWith(['/inventario/movimientos']);
    spy.mockRestore();
  });

  it('should open the registrar movimiento view for entrada and salida', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.registrar('entrada');
    expect(spy).toHaveBeenCalledWith(['/inventario/movimientos/registrar'], {
      queryParams: { tipo: 'entrada' },
    });
    component.registrar('salida');
    expect(spy).toHaveBeenCalledWith(['/inventario/movimientos/registrar'], {
      queryParams: { tipo: 'salida' },
    });
    spy.mockRestore();
  });
});
