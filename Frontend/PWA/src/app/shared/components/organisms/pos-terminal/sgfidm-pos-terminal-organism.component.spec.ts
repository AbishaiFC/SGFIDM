import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SgfidmPosTerminalOrganismComponent } from './sgfidm-pos-terminal-organism.component';

describe('SgfidmPosTerminalOrganismComponent (POS-01 Solo)', () => {
  let fixture: ComponentFixture<SgfidmPosTerminalOrganismComponent>;
  let component: SgfidmPosTerminalOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPosTerminalOrganismComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmPosTerminalOrganismComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the Solo POS header, suggestions, cart and totals', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('INKO');
    expect(text).toContain('Ana Martínez');
    expect(text).toContain('Caja abierta · CAJ-002');
    expect(text).toContain('SUGERENCIAS · 4 DE 10 RESULTADOS');
    expect(text).toContain('CARRITO');
    expect(text).toContain('RESUMEN DE VENTA');
    expect(text).toContain('PAGAR');
    expect(text).toContain('Última venta: VTA-1042');
  });

  it('should compute subtotal, discount and total from the Figma mock cart', () => {
    expect(component.productos()).toBe(7);
    expect(component.subtotal()).toBe(860);
    expect(component.descuentoMonto()).toBe(86);
    expect(component.total()).toBe(774);
  });

  it('should add a product and change quantities', () => {
    const antes = component.productos();
    component.agregar(component.sugerencias[0]);
    expect(component.productos()).toBe(antes + 1);
    component.cambiarCantidad(component.sugerencias[0], -1);
    expect(component.productos()).toBe(antes);
  });

  it('should not add a product without stock', () => {
    const antes = component.carrito().length;
    component.agregar(component.sugerencias[3]);
    expect(component.carrito().length).toBe(antes);
  });

  it('should apply and remove the global discount', () => {
    component.quitarDescuento();
    expect(component.total()).toBe(860);
    component.aplicarDescuento();
    expect(component.total()).toBe(774);
  });

  it('should empty the cart and keep the pay button disabled', () => {
    component.vaciar();
    fixture.detectChanges();
    expect(component.carrito().length).toBe(0);
    const btn = fixture.debugElement.query(By.css('sgfidm-button.pagar-btn button'));
    expect(btn.nativeElement.disabled).toBe(true);
  });
});
