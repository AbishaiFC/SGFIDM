import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmNotificationComponent } from './sgfidm-notification.component';

describe('SgfidmNotificationComponent', () => {
  let fixture: ComponentFixture<SgfidmNotificationComponent>;
  let component: SgfidmNotificationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmNotificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmNotificationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('variant', 'alta');
    fixture.componentRef.setInput('message', 'Mensaje de ejemplo');
    fixture.detectChanges();
  });

  it('should render the default eyebrow (PRIORIDAD ALTA)', () => {
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-notification__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('PRIORIDAD ALTA');
  });

  it('should set variant class', () => {
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-notification'));
    expect(wrapper.nativeElement.classList.contains('sgfidm-notification--alta')).toBe(true);
  });

  it('should set the accent style from computed accent', () => {
    const accent = fixture.debugElement.query(By.css('.sgfidm-notification__accent'));
    expect(accent.nativeElement.style.background).toBe('var(--sgfidm-color-error, #a9442e)');
  });

  it('should emit detail on detail click', () => {
    let emitted = false;
    component.detail.subscribe(() => (emitted = true));
    const btn = fixture.debugElement.query(By.css('.sgfidm-notification__detail'));
    expect(btn).toBeTruthy();
    btn.triggerEventHandler('click', null);
    expect(emitted).toBe(true);
  });

  it('should emit close on close click', () => {
    let emitted = false;
    component.close.subscribe(() => (emitted = true));
    const btn = fixture.debugElement.query(By.css('.sgfidm-notification__close'));
    btn.triggerEventHandler('click', null);
    expect(emitted).toBe(true);
  });

  it('should use custom eyebrow when provided', () => {
    fixture.componentRef.setInput('eyebrow', 'PERSONALIZADO');
    fixture.detectChanges();
    const eyebrow = fixture.debugElement.query(By.css('.sgfidm-notification__eyebrow'));
    expect(eyebrow.nativeElement.textContent).toContain('PERSONALIZADO');
  });
});
