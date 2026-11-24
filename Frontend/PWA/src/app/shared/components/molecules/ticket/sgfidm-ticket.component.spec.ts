import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SgfidmTicketComponent } from './sgfidm-ticket.component';

// Host de prueba para verificar ng-content
@Component({
  standalone: true,
  imports: [SgfidmTicketComponent],
  template: `
    <sgfidm-ticket
      company="FERRETERÍA EL FARO"
      branch="Sucursal Centro · SUC-001"
      folio="VTA-0282 · Hoy 13:40"
      total="$600.00"
    >
      <div class="detail-line">Cañas x2 – 120.00</div>
    </sgfidm-ticket>
  `,
})
class TestHostComponent {}

describe('SgfidmTicketComponent', () => {
  let fixture: ComponentFixture<SgfidmTicketComponent>;
  let component: SgfidmTicketComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmTicketComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('total', '$600.00');
    fixture.detectChanges();
  });

  it('should render the company', () => {
    fixture.componentRef.setInput('company', 'FERRETERÍA EL FARO');
    fixture.detectChanges();
    const company = fixture.debugElement.query(By.css('.sgfidm-ticket__company'));
    expect(company.nativeElement.textContent).toContain('FERRETERÍA EL FARO');
  });

  it('should render total when provided', () => {
    const total = fixture.debugElement.query(By.css('.sgfidm-ticket__total'));
    expect(total.nativeElement.textContent).toContain('TOTAL');
    expect(total.nativeElement.textContent).toContain('$600.00');
  });

  it('should render legend when showFooter', () => {
    const legend = fixture.debugElement.query(By.css('.sgfidm-ticket__legend'));
    expect(legend.nativeElement.textContent).toContain('No válido como factura');
  });

  it('should not render legend when showFooter is false', () => {
    fixture.componentRef.setInput('showFooter', false);
    fixture.detectChanges();
    const legend = fixture.debugElement.query(By.css('.sgfidm-ticket__legend'));
    expect(legend).toBeNull();
  });
});

describe('SgfidmTicketComponent — ng-content projection', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should project detail lines', () => {
    const line = hostFixture.debugElement.query(By.css('.sgfidm-ticket__body .detail-line'));
    expect(line).toBeTruthy();
    expect(line.nativeElement.textContent).toContain('Cañas x2 – 120.00');
  });
});
