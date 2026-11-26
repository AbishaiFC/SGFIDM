import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { RecoverAccountComponent } from './recover-account.component';

describe('RecoverAccountComponent', () => {
  let component: RecoverAccountComponent;
  let fixture: ComponentFixture<RecoverAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoverAccountComponent, FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title and email field', () => {
    const title = fixture.debugElement.query(By.css('.recover-account-title'));
    expect(title.nativeElement.textContent).toContain('Recupera tu cuenta');
    expect(fixture.debugElement.query(By.css('sgfidm-form-field'))).toBeTruthy();
  });

  it('should render link to login', () => {
    const link = fixture.debugElement.query(By.css('.recover-account-footer a'));
    expect(link).toBeTruthy();
  });

  it('should navigate to AUTH-03 passing the email in navigation state', () => {
    component.email = 'ana@empresa.com';
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onEnviarInstrucciones();

    expect(spy).toHaveBeenCalledWith(['/auth/recovery-sent'], {
      state: { email: 'ana@empresa.com' },
    });
    spy.mockRestore();
  });
});
