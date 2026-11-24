import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmAlertasOrganismComponent, AlertaDto } from './sgfidm-alertas-organism.component';

describe('SgfidmAlertasOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmAlertasOrganismComponent>;
  let component: SgfidmAlertasOrganismComponent;

  const sample: AlertaDto[] = [
    { id: 'AL-001', estado: 'alta', mensaje: 'Caja con diferencia en el cierre (-$120).' },
    { id: 'AL-002', estado: 'media', mensaje: 'Tu invitación de empleado expira en 24 h.' },
    { id: 'AL-003', estado: 'baja', mensaje: '2 productos sin costo registrado.' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmAlertasOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmAlertasOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('alertas', sample);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-alertas-organism__title'));
    expect(title.nativeElement.textContent).toContain('Alertas');
  });

  it('should render notifications (one per alerta)', () => {
    const notifs = fixture.debugElement.queryAll(By.css('sgfidm-notification'));
    expect(notifs.length).toBe(3);
  });

  it('should count alertas altas correctly', () => {
    expect(component.alertasAltas.length).toBe(2); // alta + media
  });

  it('should emit detalle on notification area click', () => {
    let emitted: AlertaDto | undefined;
    component.detalle.subscribe((a) => (emitted = a));
    const items = fixture.debugElement.queryAll(By.css('.sgfidm-alertas-organism__item'));
    items[0].triggerEventHandler('click', null);
    expect(emitted?.id).toBe('AL-001');
  });

  it('should render empty state when no alertas', () => {
    fixture.componentRef.setInput('alertas', []);
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('.sgfidm-alertas-organism__empty'));
    expect(empty).toBeTruthy();
  });
});
