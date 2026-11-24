import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmSeguridadOrganismComponent, SeguridadParamDto } from './sgfidm-seguridad-organism.component';

describe('SgfidmSeguridadOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmSeguridadOrganismComponent>;
  let component: SgfidmSeguridadOrganismComponent;

  const sample: SeguridadParamDto[] = [
    { id: 'S-001', nombre: 'PIN de acceso', descripcion: 'Requiere PIN de 6 dígitos', valorActual: 'Habilitado', enabled: true },
    { id: 'S-002', nombre: 'Sesión automática', descripcion: 'Rellenar credenciales guardadas', valorActual: 'Desactivado', enabled: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmSeguridadOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmSeguridadOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('params', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-seguridad-organism__title'));
    expect(title.nativeElement.textContent).toContain('Seguridad');
  });

  it('should compute enabledCount correctly', () => {
    expect(component.enabledCount).toBe(1);
    expect(component.enabledCountStr).toBe('1');
  });

  it('should emit accion detalle on item click', () => {
    let emitted: { param: SeguridadParamDto; accion: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-seguridad-organism__item'));
    items[0].triggerEventHandler('click', null);
    expect(emitted?.accion).toBe('detalle');
    expect(emitted?.param.id).toBe('S-001');
  });

  it('should emit accion toggle on switch click', () => {
    let emitted: { param: SeguridadParamDto; accion: string } | undefined;
    component.accion.subscribe((e) => (emitted = e));
    const toggles = fixture.debugElement.queryAll(By.css('.sgfidm-seguridad-organism__actions sgfidm-switch'));
    expect(toggles.length).toBe(2);
    toggles[1].triggerEventHandler('change', null);
    expect(emitted?.accion).toBe('toggle');
  });

  it('should render empty state when no params', () => {
    fixture.componentRef.setInput('params', []);
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('.sgfidm-seguridad-organism__empty'));
    expect(empty).toBeTruthy();
  });
});
