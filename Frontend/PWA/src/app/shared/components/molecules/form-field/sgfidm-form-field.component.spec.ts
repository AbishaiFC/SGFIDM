import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmFormFieldComponent } from './sgfidm-form-field.component';
import { By } from '@angular/platform-browser';
import { vi } from 'vitest';
import { SgfidmIconComponent } from '../../atoms/icon/sgfidm-icon.component';

describe('SgfidmFormFieldComponent', () => {
  let fixture: ComponentFixture<SgfidmFormFieldComponent>;
  let component: SgfidmFormFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmFormFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmFormFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Correo electrónico');
    fixture.detectChanges();
  });

  it('should render with the given label', () => {
    const label = fixture.debugElement.query(By.css('.sgfidm-form-field__label'));
    expect(label.nativeElement.textContent).toContain('Correo electrónico');
  });

  it('should default to type text', () => {
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.type).toBe('text');
  });

  it('should apply the given type to the input', () => {
    fixture.componentRef.setInput('type', 'email');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.type).toBe('email');
  });

  it('should float label when value is set', () => {
    fixture.componentRef.setInput('value', 'test@example.com');
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.sgfidm-form-field__label'));
    expect(label.nativeElement.classList).toContain('sgfidm-form-field__label--floated');
  });

  it('should float label on focus', () => {
    const input = fixture.debugElement.query(By.css('input'));
    input.triggerEventHandler('focus', {});
    fixture.detectChanges();
    const label = fixture.debugElement.query(By.css('.sgfidm-form-field__label'));
    expect(label.nativeElement.classList).toContain('sgfidm-form-field__label--floated');
  });

  it('should show error state when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Correo inválido');
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-form-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-form-field--error');
  });

  it('should render error message text', () => {
    fixture.componentRef.setInput('errorMessage', 'Campo requerido');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.sgfidm-form-field__message'));
    expect(msg.nativeElement.textContent).toContain('Campo requerido');
  });

  it('should set aria-invalid on input when in error state', () => {
    fixture.componentRef.setInput('errorMessage', 'Error');
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.getAttribute('aria-invalid')).toBe('true');
  });

  it('should disable the input when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.disabled).toBe(true);
  });

  it('should apply disabled class when disabled', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-form-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-form-field--disabled');
  });

  it('should render leading icon when provided', () => {
    fixture.componentRef.setInput('leadingIcon', 'email');
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('.sgfidm-form-field__leading-icon'));
    expect(icon).toBeTruthy();
    expect(icon.componentInstance.name()).toBe('email');
  });

  it('should render trailing icon button when provided', () => {
    fixture.componentRef.setInput('trailingIcon', 'visibility');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.sgfidm-form-field__trailing-icon'));
    expect(btn).toBeTruthy();
  });

  it('should emit trailingIconClicked when trailing icon button is clicked', () => {
    fixture.componentRef.setInput('trailingIcon', 'visibility');
    fixture.detectChanges();
    const spy = vi.fn();
    component.trailingIconClicked.subscribe(spy);
    const btn = fixture.debugElement.query(By.css('.sgfidm-form-field__trailing-icon'));
    btn.triggerEventHandler('click', {});
    expect(spy).toHaveBeenCalled();
  });

  it('should show asterisk when required', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const req = fixture.debugElement.query(By.css('.sgfidm-form-field__required'));
    expect(req).toBeTruthy();
  });

  it('should show helper text when provided and no error', () => {
    fixture.componentRef.setInput('helperText', 'Usa formato usuario@dominio.com');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.sgfidm-form-field__message'));
    expect(msg.nativeElement.textContent).toContain('Usa formato usuario@dominio.com');
  });

  it('should prioritize error message over helper text', () => {
    fixture.componentRef.setInput('helperText', 'Ayuda');
    fixture.componentRef.setInput('errorMessage', 'Error');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.sgfidm-form-field__message'));
    expect(msg.nativeElement.textContent).toContain('Error');
    expect(msg.nativeElement.textContent).not.toContain('Ayuda');
  });
});
