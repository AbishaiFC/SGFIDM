import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmFinanzasOrganismComponent, MovimientoFincieroDto } from './sgfidm-finanzas-organism.component';

describe('SgfidmFinanzasOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmFinanzasOrganismComponent>;
  let component: SgfidmFinanzasOrganismComponent;

  const sample: MovimientoFincieroDto[] = [
    { id: 'F-001', descripcion: 'Venta de productos', tipo: 'ingreso', monto: '$150.00', estado: 'confirmado' },
    { id: 'F-002', descripcion: 'Compra de materiales', tipo: 'gasto', monto: '$50.00', estado: 'pendiente' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmFinanzasOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmFinanzasOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('movimientos', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-finanzas-organism__title'));
    expect(title.nativeElement.textContent).toContain('Finanzas');
  });

  it('should compute ingresosTotal (1 movimiento)', () => {
    expect(component.ingresosTotal).toBe('150.00');
  });

  it('should compute gastosTotal', () => {
    expect(component.gastosTotal).toBe('50.00');
  });

  it('should emit accion detalle on item click', () => {
    let emitted: { movimiento: MovimientoFincieroDto; tipo: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-finanzas-organism__item'));
    expect(items.length).toBe(2);
    items[0].triggerEventHandler('click', null);
    expect(emitted?.tipo).toBe('detalle');
    expect(emitted?.movimiento.id).toBe('F-001');
  });

  it('should render indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(3);
  });
});
