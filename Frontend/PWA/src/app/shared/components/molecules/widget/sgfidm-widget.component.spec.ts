import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { SgfidmWidgetComponent } from './sgfidm-widget.component';

// Host de prueba para verificar ng-content
@Component({
  standalone: true,
  imports: [SgfidmWidgetComponent],
  template: `
    <sgfidm-widget eyebrow="TOTAL VENTAS">
      <span class="body-content">$ 4,820.50</span>
    </sgfidm-widget>
  `,
})
class TestHostComponent {}

describe('SgfidmWidgetComponent', () => {
  let fixture: ComponentFixture<SgfidmWidgetComponent>;
  let component: SgfidmWidgetComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the eyebrow when provided', () => {
    fixture.componentRef.setInput('eyebrow', 'TOTAL VENTAS');
    fixture.detectChanges();
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-widget__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('TOTAL VENTAS');
  });

  it('should not render eyebrow when empty', () => {
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-widget__eyebrow'));
    expect(eyebrow).toBeNull();
  });

  it('should render the widget wrapper with role', () => {
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-widget'));
    expect(wrapper.nativeElement.getAttribute('role')).toBe('widget');
  });
});

describe('SgfidmWidgetComponent — ng-content projection', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();
  });

  it('should project body content', () => {
    const body = hostFixture.debugElement.query(By.css('.sgfidm-widget__body .body-content'));
    expect(body).toBeTruthy();
    expect(body.nativeElement.textContent).toContain('$ 4,820.50');
  });
});
