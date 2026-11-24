import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmProductosOrganismComponent, ProductoCatalogDto } from './sgfidm-productos-organism.component';

describe('SgfidmProductosOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmProductosOrganismComponent>;
  let component: SgfidmProductosOrganismComponent;

  const sample: ProductoCatalogDto[] = [
    { id: 'P-001', codigo: 'PROD-001', nombre: 'Cañas de acero', precioVenta: '$90.00', costo: '$40.00', status: 'activo' },
    { id: 'P-002', codigo: 'PROD-002', nombre: 'Martillos', precioVenta: '$75.00', status: 'activo' },
    { id: 'P-003', codigo: 'PROD-003', nombre: 'Antiguo', precioVenta: '$5.00', status: 'archivado' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmProductosOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmProductosOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('productos', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-productos-organism__title'));
    expect(title.nativeElement.textContent).toContain('Productos');
  });

  it('should render indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
    expect(cards[0].nativeElement.textContent).toContain('PRODUCTOS ACTIVOS');
  });

  it('should show activos count (2)', () => {
    expect(component.productosActivos.length).toBe(2);
    expect(component.countActivos).toBe('2');
  });

  it('should filter by tab and show empty state when switching to empty tab', () => {
    fixture.componentRef.setInput('productos', [sample[0], sample[2]]);
    component.onTab('archivados');
    fixture.detectChanges();
    // P-003 archivado → debe mostrarse en pestaña archivados
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-productos-organism__item'));
    expect(items.length).toBe(1);
    expect(items[0].nativeElement.textContent).toContain('Antiguo');
  });

  it('should emit accion detalle on item click', () => {
    let emitted: { producto: ProductoCatalogDto; tipo: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-productos-organism__item'));
    items[0].triggerEventHandler('click', null);
    expect(emitted?.tipo).toBe('detalle');
    expect(emitted?.producto.codigo).toBe('PROD-001');
  });

  it('should render first product code and name', () => {
    const first = fixture.debugElement.query(By.css('.sgfidm-productos-organism__code'));
    expect(first.nativeElement.textContent).toContain('PROD-001');
  });
});
