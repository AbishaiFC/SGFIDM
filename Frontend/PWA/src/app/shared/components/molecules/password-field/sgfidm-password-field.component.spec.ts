import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmPasswordFieldComponent } from './sgfidm-password-field.component';
import { By } from '@angular/platform-browser';

describe('SgfidmPasswordFieldComponent', () => {
  let fixture: ComponentFixture<SgfidmPasswordFieldComponent>;
  let component: SgfidmPasswordFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmPasswordFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmPasswordFieldComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Contraseña');
    fixture.detectChanges();
  });

  it('should render with the given label', () => {
    const label = fixture.debugElement.query(By.css('.sgfidm-form-field__label'));
    expect(label.nativeElement.textContent).toContain('Contraseña');
  });

  it('should start with password type hidden', () => {
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.type).toBe('password');
    expect(component.visible).toBe(false);
  });

  it('should show visibility icon when hidden', () => {
    const btn = fixture.debugElement.query(By.css('.sgfidm-form-field__trailing-icon'));
    expect(btn.nativeElement.textContent).toContain('visibility');
  });

  it('should toggle to text type after toggleVisibility', () => {
    component.toggleVisibility();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.type).toBe('text');
    expect(component.visible).toBe(true);
  });

  it('should show visibility_off icon when visible', () => {
    component.toggleVisibility();
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.sgfidm-form-field__trailing-icon'));
    expect(btn.nativeElement.textContent).toContain('visibility_off');
  });

  it('should toggle back to password on second click', () => {
    component.toggleVisibility();
    component.toggleVisibility();
    fixture.detectChanges();
    const input = fixture.debugElement.query(By.css('input'));
    expect(input.nativeElement.type).toBe('password');
  });

  it('should show error message when errorMessage is set', () => {
    fixture.componentRef.setInput('errorMessage', 'Mínimo 8 caracteres');
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.sgfidm-form-field__message'));
    expect(msg.nativeElement.textContent).toContain('Mínimo 8 caracteres');
  });

  it('should use lock icon as default leading icon', () => {
    const icon = fixture.debugElement.query(By.css('.sgfidm-form-field__leading-icon'));
    expect(icon.nativeElement.textContent.trim()).toBe('lock');
  });

  it('should forward disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-form-field'));
    expect(wrapper.nativeElement.classList).toContain('sgfidm-form-field--disabled');
  });

  it('should forward required state', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();
    const req = fixture.debugElement.query(By.css('.sgfidm-form-field__required'));
    expect(req).toBeTruthy();
  });
});
