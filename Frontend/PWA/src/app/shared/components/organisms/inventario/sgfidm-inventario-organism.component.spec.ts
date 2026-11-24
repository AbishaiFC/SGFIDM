import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmInventarioOrganismComponent, ProductoInventarioDto } from './sgfidm-inventario-organism.component';

describe('SgfidmInventarioOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmInventarioOrganismComponent>;
  let component: SgfidmInventarioOrganismComponent;

  const sampleProductos: ProductoInventarioDto[] = [
    { id: 'P-001', nombre: 'Cañas de acero', costo: '$40.00', precio: '$90.00', stock: 12, stockCritico: 5 },
    { id: 'P-002', nombre: 'Martillos', costo: '$30.00', precio: '$75.00', stock: 3, stockCritico: 5 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmInventarioOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmInventarioOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productos', sampleProductos);
    fixture.detectChanges();
  });

  it('should render the header title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-inventario-organism__title'));
    expect(title.nativeElement.textContent).toContain('Inventario');
  });

  it('should render indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
  });

  it('should render products via the panel', () => {
    const panel = fixture.debugElement.query(By.css('sgfidm-panel-card'));
    expect(panel).toBeTruthy();
    const productNames = fixture.debugElement.queryAll(By.css('.sgfidm-inventario-organism__product')).map(
      (el) => el.nativeElement.textContent,
    );
    expect(productNames.some((t) => t.includes('Cañas de acero'))).toBe(true);
  });

  it('should compute stockCritico filtered list', () => {
    expect(component.stockCritico().length).toBe(1); // Martillos está crítico
  });

  it('should emit accion on product click', () => {
    let emitted: ProductoInventarioDto | undefined;
    component.accion.subscribe((p) => (emitted = p));
    const products = fixture.debugElement.queryAll(By.css('.sgfidm-inventario-organism__product'));
    products[0].triggerEventHandler('click', null);
    expect(emitted?.id).toBe('P-001');
  });

  it('should show EmptyState when no products (decisión B12)', () => {
    fixture.componentRef.setInput('productos', []);
    fixture.detectChanges();
    const emptyState = fixture.debugElement.query(By.css('sgfidm-empty-state'));
    expect(emptyState).toBeTruthy();
    expect(fixture.debugElement.query(By.css('sgfidm-panel-card'))).toBeNull();
  });

  it('should render empty state action and emit action', () => {
    fixture.componentRef.setInput('productos', []);
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('sgfidm-empty-state sgfidm-button'));
    expect(btn.nativeElement.textContent).toContain('Nuevo producto');
    let emitted: ProductoInventarioDto | undefined;
    component.accion.subscribe((p) => (emitted = p));
    btn.triggerEventHandler('click', null);
    expect(emitted).toBeTruthy();
  });
});
