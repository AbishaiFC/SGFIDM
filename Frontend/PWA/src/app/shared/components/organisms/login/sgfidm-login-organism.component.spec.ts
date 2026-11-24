import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SgfidmLoginOrganismComponent } from './sgfidm-login-organism.component';

describe('SgfidmLoginOrganismComponent', () => {
  let fixture: ComponentFixture<SgfidmLoginOrganismComponent>;
  let component: SgfidmLoginOrganismComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmLoginOrganismComponent, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmLoginOrganismComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Iniciar sesión');
    fixture.detectChanges();
  });

  it('should render the AuthCard wrapper with title', () => {
    const card = fixture.debugElement.query(By.css('.sgfidm-auth-card'));
    expect(card).toBeTruthy();
    const title = fixture.debugElement.query(By.css('.sgfidm-auth-card__title'));
    expect(title.nativeElement.textContent).toContain('Iniciar sesión');
  });

  it('should render form fields for email and password', () => {
    const fields = fixture.debugElement.queryAll(By.css('sgfidm-form-field'));
    expect(fields.length).toBe(2);
  });

  it('should render the submit button', () => {
    const btn = fixture.debugElement.query(By.css('.login-organism-button-text'));
    expect(btn.nativeElement.textContent).toContain('Iniciar sesión');
  });

  it('should toggle password visibility', () => {
    const toggle = fixture.debugElement.query(By.css('.login-organism-password-toggle'));
    expect(toggle).toBeTruthy();
    toggle.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.hidePassword()).toBe(false);
  });

  it('should emit submit with form data', () => {
    let emitted: { email: string; password: string } | undefined;
    component.submit.subscribe((d) => (emitted = d));
    component.form.email = 'user@example.com';
    component.form.password = '1234abcd';
    const btn = fixture.debugElement.query(By.css('sgfidm-button'));
    btn.triggerEventHandler('click', null);
    expect(emitted).toEqual({ email: 'user@example.com', password: '1234abcd' });
  });
});
