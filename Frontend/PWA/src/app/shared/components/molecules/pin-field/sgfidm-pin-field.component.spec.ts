import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmPinFieldComponent } from './sgfidm-pin-field.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';

describe('SgfidmPinFieldComponent', () => {
  let fixture: ComponentFixture<SgfidmPinFieldComponent>;
  let component: SgfidmPinFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPinFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmPinFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the default title', () => {
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-pin-field'));
    expect(wrapper.nativeElement.getAttribute('aria-label')).toBe('PIN de acceso rápido');
  });

  it('should use custom title when provided', () => {
    fixture.componentRef.setInput('title', 'Código de verificación');
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-pin-field'));
    expect(wrapper.nativeElement.getAttribute('aria-label')).toBe('Código de verificación');
  });

  it('should render the inner sgfidm-pin-input atom', () => {
    const atom = fixture.debugElement.query(By.css('sgfidm-pin-input'));
    expect(atom).toBeTruthy();
  });

  it('should show error class when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'PIN incorrecto');
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-pin-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-pin-field--error');
  });

  it('should show error class when state is error', () => {
    fixture.componentRef.setInput('state', 'error');
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-pin-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-pin-field--error');
  });

  it('should render error message paragraph when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'PIN incorrecto');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.sgfidm-pin-field__error'));
    expect(msg).toBeTruthy();
    expect(msg.nativeElement.textContent).toContain('PIN incorrecto');
  });

  it('should not render error paragraph when errorMessage is empty', () => {
    const msg = fixture.debugElement.query(By.css('.sgfidm-pin-field__error'));
    expect(msg).toBeNull();
  });

  it('should show loading class when state is loading', () => {
    fixture.componentRef.setInput('state', 'loading');
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-pin-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-pin-field--loading');
  });

  it('should show success class when state is success', () => {
    fixture.componentRef.setInput('state', 'success');
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-pin-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-pin-field--success');
  });

  it('should emit pinComplete when inner atom emits pinComplete', () => {
    const spy = vi.fn();
    component.pinComplete.subscribe(spy);
    component.onPinComplete('123456');
    expect(spy).toHaveBeenCalledWith('123456');
  });
});
