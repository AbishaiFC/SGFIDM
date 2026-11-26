import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { VerifyEmailComponent } from './verify-email.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('VerifyEmailComponent', () => {
  let component: VerifyEmailComponent;
  let fixture: ComponentFixture<VerifyEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyEmailComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the verify email title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-auth-card__title'));
    expect(title.nativeElement.textContent).toContain('Confirma tu correo electrónico');
  });

  it('should render the info icon and disabled text field', () => {
    expect(fixture.debugElement.query(By.css('.verify-email-info-icon'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('sgfidm-form-field'))).toBeTruthy();
  });

  it('should render the reenviar button and footer link', () => {
    expect(fixture.debugElement.query(By.css('sgfidm-button'))).toBeTruthy();
    const footerLink = fixture.debugElement.query(By.css('.verify-email-footer a'));
    expect(footerLink).toBeTruthy();
  });
});
