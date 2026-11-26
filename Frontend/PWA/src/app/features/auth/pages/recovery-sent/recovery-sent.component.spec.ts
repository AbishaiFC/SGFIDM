import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { RecoverySentComponent } from './recovery-sent.component';

describe('RecoverySentComponent', () => {
  let component: RecoverySentComponent;
  let fixture: ComponentFixture<RecoverySentComponent>;
  const originalState = window.history.state;

  beforeEach(async () => {
    window.history.replaceState({ email: 'ana@empresa.com' }, '');
    await TestBed.configureTestingModule({
      imports: [
        RecoverySentComponent,
        RouterTestingModule.withRoutes([
          { path: 'auth/login', component: RecoverySentComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverySentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    window.history.replaceState(originalState, '');
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Figma title, subtitle, label, helper and actions', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Instrucciones enviadas');
    expect(text).toContain(
      'Si el correo está registrado, enviamos un enlace para restablecer la contraseña a:',
    );
    expect(text).toContain('Correo ingresado');
    expect(text).toContain('Si no lo encuentras, revisa la carpeta de correo no deseado.');
    expect(text).toContain('Enviar de nuevo');
    expect(text).toContain('Volver al inicio de sesión');
  });

  it('should mask the email passed from AUTH-02', () => {
    expect(component.maskedEmail).toBe('a•••••@empresa.com');
    const value = fixture.debugElement.query(By.css('.recovery-sent-email__value'));
    expect(value.nativeElement.textContent).toContain('a•••••@empresa.com');
  });

  it('should show loading while resending and restore the button afterwards', () => {
    vi.useFakeTimers();
    component.onEnviarDeNuevo();
    expect(component.isSending).toBe(true);
    vi.advanceTimersByTime(800);
    expect(component.isSending).toBe(false);
  });

  it('should navigate to login from the footer link', async () => {
    const link = fixture.debugElement.query(By.css('.recovery-sent-link'));
    link.nativeElement.click();
    await fixture.whenStable();
    expect(TestBed.inject(Router).url).toBe('/auth/login');
  });
});
