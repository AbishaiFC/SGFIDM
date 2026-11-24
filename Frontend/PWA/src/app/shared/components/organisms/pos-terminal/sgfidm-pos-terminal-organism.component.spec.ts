import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmPosTerminalOrganismComponent } from './sgfidm-pos-terminal-organism.component';

describe('SgfidmPosTerminalOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmPosTerminalOrganismComponent>;
  let component: SgfidmPosTerminalOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPosTerminalOrganismComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmPosTerminalOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('cartLines', [{ label: 'Carrito (0 productos)' }]);
    fixture.componentRef.setInput('totals', [
      { label: 'Subtotal', value: '$0.00' },
      { label: 'TOTAL', value: '$0.00', total: true, hasDivider: true },
    ]);
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-pos-terminal-organism__title'));
    expect(title.nativeElement.textContent).toContain('Punto de Venta');
  });

  it('should render the subtitle', () => {
    const subtitle = fixture.debugElement.query(By.css('.sgfidm-pos-terminal-organism__subtitle'));
    expect(subtitle.nativeElement.textContent).toContain('Terminal de venta — POS-01');
  });

  it('should render cart column with PanelCard', () => {
    const cartColumn = fixture.debugElement.query(By.css('.sgfidm-pos-terminal-organism__cart-column'));
    expect(cartColumn).toBeTruthy();
    const panels = fixture.debugElement.queryAll(By.css('sgfidm-panel-card'));
    expect(panels.length).toBeGreaterThan(0);
  });

  it('should render totals column with PanelCard', () => {
    const totalsColumn = fixture.debugElement.query(By.css('.sgfidm-pos-terminal-organism__totals-column'));
    expect(totalsColumn).toBeTruthy();
  });

  it('should render Pagar button', () => {
    const btn = fixture.debugElement.query(By.css('sgfidm-button.pagar-btn'));
    expect(btn.nativeElement.textContent).toContain('Pagar');
  });
});
