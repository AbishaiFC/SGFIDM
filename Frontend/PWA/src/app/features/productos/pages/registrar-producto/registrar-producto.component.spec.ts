import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { RegistrarProductoComponent } from './registrar-producto.component';

describe('RegistrarProductoComponent (PROD-02 Solo)', () => {
  let fixture: ComponentFixture<RegistrarProductoComponent>;
  let component: RegistrarProductoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistrarProductoComponent,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'dashboard', component: RegistrarProductoComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrarProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('sgfidm-productos');
    localStorage.removeItem('sgfidm-primer-producto');
  });

  it('should create and render the Figma registration form', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Registrar producto');
    expect(text).toContain('Identificación');
    expect(text).toContain('Código de producto');
    expect(text).toContain('Código de barras');
    expect(text).toContain('Opcional · solo categorías activas ·');
    expect(text).toContain('Precio y costo');
    expect(text).toContain('Precio que se usa en el POS. Puedes sobrescribirlo más adelante.');
    expect(text).toContain('Sin costo, el análisis de rentabilidad quedará incompleto.');
    expect(text).toContain('Detalles');
    expect(text).toContain('Unidad de medida');
    expect(text).toContain('STOCK MÍNIMO');
    expect(text).toContain('Cancelar');
  });

  it('should require the product name', () => {
    component.onRegistrar();
    expect(component.error()).toContain('obligatorio');
  });

  it('should require a valid sale price', () => {
    component.nombre.set('Harina de Trigo');
    component.onRegistrar();
    expect(component.error()).toContain('precio de venta válido');
  });

  it('should save the product, complete INICIO-02 and return to the dashboard', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.nombre.set('Harina de Trigo 1kg');
    component.precio.set('28.50');
    component.costo.set('18.00');
    component.stockMinimo.set('10');
    component.onRegistrar();

    const productos = JSON.parse(localStorage.getItem('sgfidm-productos') || '[]');
    expect(productos).toHaveLength(1);
    expect(productos[0].codigo).toBe('PROD-129');
    expect(productos[0].nombre).toBe('Harina de Trigo 1kg');
    expect(productos[0].precioVenta).toBe(28.5);
    expect(productos[0].stockActual).toBe(0);
    expect(localStorage.getItem('sgfidm-primer-producto')).toBe('true');
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });

  it('should submit only once per real button click', () => {
    localStorage.removeItem('sgfidm-productos');
    component.nombre.set('Producto único');
    component.precio.set('10');
    const botones: HTMLButtonElement[] = Array.from(
      fixture.debugElement.nativeElement.querySelectorAll('sgfidm-button button'),
    );
    const boton = botones.find((b) => b.textContent?.includes('Registrar producto'));
    boton!.click();
    const guardados = JSON.parse(localStorage.getItem('sgfidm-productos') || '[]');
    expect(guardados).toHaveLength(1);
  });

  it('should open the categories hub from Gestionar categorías', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.gestionarCategorias();
    expect(spy).toHaveBeenCalledWith(['/productos/categorias']);
    spy.mockRestore();
  });

  it('should cancel back to the dashboard', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onCancelar();
    expect(spy).toHaveBeenCalledWith(['/dashboard']);
    spy.mockRestore();
  });
});
