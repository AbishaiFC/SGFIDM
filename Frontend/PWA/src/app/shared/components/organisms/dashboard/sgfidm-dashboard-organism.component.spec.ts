import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmDashboardOrganismComponent } from './sgfidm-dashboard-organism.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';

describe('SgfidmDashboardOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmDashboardOrganismComponent>;
  let component: SgfidmDashboardOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmDashboardOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmDashboardOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('indicators', [
      { eyebrow: 'VENTAS DEL DÍA', value: '$100.00', delta: 'Hoy' },
      { eyebrow: 'ESTADO DE CAJA', value: 'Abierta', delta: 'Abre una caja' },
    ]);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__title'));
    expect(title.nativeElement.textContent).toContain('Dashboard Operativo');
  });

  it('should render the subtitle', () => {
    const subtitle = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__subtitle'));
    expect(subtitle.nativeElement.textContent).toContain('Resumen de indicadores del negocio');
  });

  it('should render the indicators grid', () => {
    const grid = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__indicators-grid'));
    expect(grid).toBeTruthy();
  });

  it('should render an IndicatorCard per indicator', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    expect(cards.length).toBe(2);
  });

  it('should render data via IndicatorCard inputs', () => {
    const cards = fixture.debugElement.queryAll(By.css('sgfidm-indicator-card'));
    const eyebrow = cards[0].query(By.css('.sgfidm-indicator-card__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('VENTAS DEL DÍA');
  });
});
