import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmEmpleadosOrganismComponent, EmpleadoDto } from './sgfidm-empleados-organism.component';

describe('SgfidmEmpleadosOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmEmpleadosOrganismComponent>;
  let component: SgfidmEmpleadosOrganismComponent;

  const sample: EmpleadoDto[] = [
    { id: 'E-001', nombre: 'Juan Pérez', rol: 'Administrador', status: 'activo' },
    { id: 'E-002', nombre: 'Ana Gómez', rol: 'Cajero' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmEmpleadosOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmEmpleadosOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('empleados', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-empleados-organism__title'));
    expect(title.nativeElement.textContent).toContain('Empleados');
  });

  it('should render indicator cards', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
  });

  it('should compute totalEmpleados correctly', () => {
    expect(component.totalEmpleados).toBe('2');
  });

  it('should emit accion detalle on item click', () => {
    let emitted: { empleado: EmpleadoDto; tipo: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-empleados-organism__item'));
    items[0].triggerEventHandler('click', null);
    expect(emitted?.tipo).toBe('detalle');
    expect(emitted?.empleado.id).toBe('E-001');
  });

  it('should render empty state when no empleados', () => {
    fixture.componentRef.setInput('empleados', []);
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('sgfidm-empty-state'));
    expect(empty).toBeTruthy();
  });
});
