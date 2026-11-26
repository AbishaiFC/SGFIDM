import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmDashboardOrganismComponent } from './sgfidm-dashboard-organism.component';
import { SgfidmIndicatorCardComponent } from '../../molecules/indicator-card/sgfidm-indicator-card.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SgfidmDashboardOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmDashboardOrganismComponent>;
  let component: SgfidmDashboardOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmDashboardOrganismComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmDashboardOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('indicators', [
      { eyebrow: 'VENTAS DEL DÍA', value: '$100.00', delta: 'Hoy' },
      { eyebrow: 'ESTADO DE CAJA', value: 'Abierta', delta: 'Abre una caja' },
    ]);
    fixture.detectChanges();
  });

  it('should render the Figma operational header', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__title'));
    expect(title.nativeElement.textContent).toContain('Buenos días, Ana');
    const subtitle = fixture.debugElement.query(By.css('.sgfidm-dashboard-organism__subtitle'));
    expect(subtitle.nativeElement.textContent).toContain('Este es el estado de Mi negocio hoy.');
  });

  it('should render the cash status, alerts and recent activity', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Caja abierta');
    expect(text).toContain('Puedes vender ahora');
    expect(text).toContain('Requiere tu atención');
    expect(text).toContain('Productos con bajo stock');
    expect(text).toContain('Actividad reciente');
    expect(text).toContain('Venta · $340');
    expect(text).toContain('ACCIONES RÁPIDAS');
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
