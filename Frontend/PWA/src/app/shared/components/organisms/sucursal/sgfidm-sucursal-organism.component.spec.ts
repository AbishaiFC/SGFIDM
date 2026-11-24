import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmSucursalOrganismComponent, SucursalDto } from './sgfidm-sucursal-organism.component';

describe('SgfidmSucursalOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmSucursalOrganismComponent>;
  let component: SgfidmSucursalOrganismComponent;

  const sample: SucursalDto[] = [
    { id: 'S-001', nombre: 'Sucursal Centro', direccion: 'Calle Feria 123', status: 'activa' },
    { id: 'S-002', nombre: 'Sucursal Sur', direccion: 'Avenida Sol' },
    { id: 'S-003', nombre: 'Sucursal Norte', status: 'archivada' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmSucursalOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmSucursalOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sucursales', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-sucursal-organism__title'));
    expect(title.nativeElement.textContent).toContain('Sucursales');
  });

  it('should render indicators', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
    expect(cards[0].nativeElement.textContent).toContain('TOTAL DE SUCURSALES');
  });

  it('should count activas correctly (default status)', () => {
    expect(component.sucursalesActivas.length).toBe(2); // Sucursal Centro + Sucursal Sur
  });

  it('should render sucursal items', () => {
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-sucursal-organism__item'));
    expect(items.length).toBe(3);
  });

  it('should emit accion detalle on click', () => {
    let emitted: { sucursal: SucursalDto; tipo: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-sucursal-organism__item'));
    items[0].triggerEventHandler('click', null);
    expect(emitted?.tipo).toBe('detalle');
    expect(emitted?.sucursal.id).toBe('S-001');
  });

  it('should show empty state when no sucursales', () => {
    fixture.componentRef.setInput('sucursales', []);
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('.sgfidm-sucursal-organism__empty'));
    expect(empty).toBeTruthy();
  });
});
