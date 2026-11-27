import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { VentaRegistradaComponent } from './venta-registrada.component';
import { PagoConfirmado } from '../procesar-pago/procesar-pago.component';

describe('VentaRegistradaComponent (POS-03 Solo)', () => {
  let fixture: ComponentFixture<VentaRegistradaComponent>;
  let component: VentaRegistradaComponent;

  const pago: PagoConfirmado = {
    metodo: 'Efectivo',
    montoRecibido: 1000,
    cambio: 226,
    cliente: 'María López',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaRegistradaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VentaRegistradaComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pago', pago);
    fixture.componentRef.setInput('total', 774);
  });

  it('should render the registered sale confirmation', () => {
    fixture.detectChanges();
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Venta registrada');
    expect(text).toContain('VTA-1043');
    expect(text).toContain('$774.00');
    expect(text).toContain('$226.00');
    expect(text).toContain('recibido $1,000.00');
    expect(text).toContain('Imprimir comprobante');
    expect(text).toContain('Ver comprobante');
    expect(text).toContain('Nueva venta');
    expect(text).toContain('Cierre automático en 5 s');
  });

  it('should auto-close after five seconds', () => {
    vi.useFakeTimers();
    let cerrado = false;
    component.cerrar.subscribe(() => (cerrado = true));
    fixture.detectChanges();
    vi.advanceTimersByTime(5000);
    expect(cerrado).toBe(true);
    vi.useRealTimers();
  });

  it('should close immediately on Nueva venta', () => {
    let cerrado = false;
    component.cerrar.subscribe(() => (cerrado = true));
    component.nuevaVenta();
    expect(cerrado).toBe(true);
  });
});
