import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ProductosComponent } from './productos.component';

describe('ProductosComponent (PROD-01 Solo)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductosComponent,
        RouterTestingModule.withRoutes([
          { path: 'productos/registrar', component: ProductosComponent },
        ]),
      ],
    }).compileComponents();
  });

  it('should compose the canonical catalog organism', () => {
    const fixture = TestBed.createComponent(ProductosComponent);
    fixture.detectChanges();
    const texto = fixture.debugElement.nativeElement.textContent;
    expect(texto).toContain('128 productos · 114 activos · 3 con bajo stock');
    expect(fixture.componentInstance.productos).toHaveLength(6);
  });

  it('should open the product detail from a row', () => {
    const fixture = TestBed.createComponent(ProductosComponent);
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.onAccion(fixture.componentInstance.productos[0]);
    expect(spy).toHaveBeenCalledWith(['/productos', 'PROD-018']);
    spy.mockRestore();
  });

  it('should open the registrar producto view', () => {
    const fixture = TestBed.createComponent(ProductosComponent);
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.agregarProducto();
    expect(spy).toHaveBeenCalledWith(['/productos/registrar']);
    spy.mockRestore();
  });
});
