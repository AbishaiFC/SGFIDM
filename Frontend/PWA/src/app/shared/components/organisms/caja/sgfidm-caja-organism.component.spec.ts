import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmCajaOrganismComponent, CajaSessionDto } from './sgfidm-caja-organism.component';

describe('SgfidmCajaOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmCajaOrganismComponent>;
  let component: SgfidmCajaOrganismComponent;

  const sampleSessions: CajaSessionDto[] = [
    { id: 'SES-001', sucursal: 'Principal', totalVenta: '$1,200.00', status: 'activa' },
    { id: 'SES-002', sucursal: 'Principal', totalVenta: '$45.50', status: 'activa' },
    { id: 'SES-003', sucursal: 'Principal', totalVenta: '$0.00', status: 'huérfana' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmCajaOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmCajaOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sessions', sampleSessions);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-caja-organism__title'));
    expect(title.nativeElement.textContent).toContain('Estado de cajas');
  });

  it('should render branch name', () => {
    const branch = fixture.debugElement.query(By.css('.sgfidm-caja-organism__branch'));
    expect(branch.nativeElement.textContent).toContain('Principal');
  });

  it('should render the panel with sessions', () => {
    const panel = fixture.debugElement.query(By.css('sgfidm-panel-card'));
    expect(panel).toBeTruthy();
  });

  it('should filter sessions by active tab (activas)', () => {
    const sessions = fixture.debugElement.queryAll(By.css('.sgfidm-caja-organism__session'));
    expect(sessions.length).toBe(2);
  });

  it('should change tab to huérreras and filter', () => {
    component.onTabChange('huérfanas');
    fixture.detectChanges();
    const sessions = fixture.debugElement.queryAll(By.css('.sgfidm-caja-organism__session'));
    expect(sessions.length).toBe(1);
  });

  it('should emit sessionAction with open when clicking active session', () => {
    let emitted: { id: string; action: string } | undefined;
    component.sessionAction.subscribe((e) => (emitted = e));
    const sessions = fixture.debugElement.queryAll(By.css('.sgfidm-caja-organism__session'));
    sessions[0].triggerEventHandler('click', null);
    expect(emitted).toEqual({ id: 'SES-001', action: 'close' });
  });

  it('should render empty state when no sessions', () => {
    fixture.componentRef.setInput('sessions', []);
    fixture.detectChanges();
    const empty = fixture.debugElement.query(By.css('.sgfidm-caja-organism__empty'));
    expect(empty).toBeTruthy();
  });
});
