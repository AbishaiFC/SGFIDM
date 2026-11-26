import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { DetalleProductoComponent } from './detalle-producto.component';

describe('DetalleProductoComponent (PROD-03 Solo)', () => {
  let fixture: ComponentFixture<DetalleProductoComponent>;
  let component: DetalleProductoComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DetalleProductoComponent,
        RouterTestingModule.withRoutes([{ path: 'inventario', component: DetalleProductoComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical product header, indicators and five tabs', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PROD-018');
    expect(text).toContain('Café de altura');
    expect(text).toContain('Volver al catálogo');
    expect(text).toContain('PRECIO BASE');
    expect(text).toContain('$185.00');
    expect(text).toContain('50.3%');
    expect(component.tabs).toHaveLength(5);
    expect(text).toContain('Información general');
    expect(text).toContain('Existencias');
    expect(text).toContain('Historial de precios y costos');
    expect(text).toContain('Márgenes');
    expect(text).toContain('Movimientos');
    expect(fixture.debugElement.nativeElement.querySelectorAll('sgfidm-indicator-card')).toHaveLength(5);
  });

  it('should switch tabs and render their content', () => {
    component.tab.set('Márgenes');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('$93.00');
    component.tab.set('Historial de precios y costos');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('Ana Martínez');
  });

  it('should navigate to Inventario from the Existencias tab', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.verInventario();
    expect(spy).toHaveBeenCalledWith(['/inventario']);
    spy.mockRestore();
  });

  it('should show a ToDo for edit and archive actions', () => {
    component.pendiente('PROD-04', 'Editar');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('PROD-04');
  });
});
