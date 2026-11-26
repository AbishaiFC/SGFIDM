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

  it('should render the form field and the password field molecule', () => {
    expect(fixture.debugElement.query(By.css('sgfidm-form-field'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('sgfidm-password-field'))).toBeTruthy();
  });

  it('should use the wide AUTH card variant', () => {
    const card = fixture.debugElement.query(By.css('.sgfidm-auth-card'));
    expect(card.nativeElement.classList.contains('sgfidm-auth-card--wide')).toBe(true);
  });

  it('should render the submit button', () => {
    const btn = fixture.debugElement.query(By.css('.login-organism-button-text'));
    expect(btn.nativeElement.textContent).toContain('Iniciar sesión');
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
