import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmPanelCardComponent } from './sgfidm-panel-card.component';
import { By } from '@angular/platform-browser';

describe('SgfidmPanelCardComponent', () => {
  let fixture: ComponentFixture<SgfidmPanelCardComponent>;
  let component: SgfidmPanelCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPanelCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmPanelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have eyebrow when provided', () => {
    fixture.componentRef.setInput('eyebrow', 'REPORTES');
    fixture.detectChanges();
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-panel-card__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('REPORTES');
  });

  it('should not render eyebrow when empty', () => {
    fixture.detectChanges();
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-panel-card__eyebrow'));
    expect(eyebrow).toBeNull();
  });

  it('should render the card wrapper', () => {
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-panel-card'));
    expect(wrapper).toBeTruthy();
  });
});
