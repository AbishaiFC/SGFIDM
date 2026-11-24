import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmIndicatorCardComponent } from './sgfidm-indicator-card.component';
import { By } from '@angular/platform-browser';

describe('SgfidmIndicatorCardComponent', () => {
  let fixture: ComponentFixture<SgfidmIndicatorCardComponent>;
  let component: SgfidmIndicatorCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmIndicatorCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmIndicatorCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('eyebrow', 'Ventas del día');
    fixture.componentRef.setInput('value', '$4,820.50');
    fixture.detectChanges();
  });

  it('should render the eyebrow', () => {
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-indicator-card__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('Ventas del día');
  });

  it('should render the value (dato principal)', () => {
    const value = fixture.debugElement.query(By.css('.sgfidm-indicator-card__value'));
    expect(value.nativeElement.textContent).toContain('$4,820.50');
    expect(value.nativeElement.getAttribute('data-value')).toBe('$4,820.50');
  });

  it('should render delta when provided', () => {
    fixture.componentRef.setInput('delta', '▲ 12% vs. ayer');
    fixture.detectChanges();
    const delta = fixture.debugElement.query(By.css('.sgfidm-indicator-card__delta'));
    expect(delta.nativeElement.textContent).toContain('▲ 12% vs. ayer');
  });

  it('should not render delta when empty', () => {
    fixture.componentRef.setInput('delta', '');
    fixture.detectChanges();
    const delta = fixture.debugElement.query(By.css('.sgfidm-indicator-card__delta'));
    expect(delta).toBeNull();
  });
});
