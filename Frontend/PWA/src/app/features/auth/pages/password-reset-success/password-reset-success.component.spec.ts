import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { PasswordResetSuccessComponent } from './password-reset-success.component';

describe('PasswordResetSuccessComponent (AUTH-05)', () => {
  let fixture: ComponentFixture<PasswordResetSuccessComponent>;
  let component: PasswordResetSuccessComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PasswordResetSuccessComponent,
        RouterTestingModule.withRoutes([{ path: 'auth/login', component: PasswordResetSuccessComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordResetSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Figma confirmation', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Tu contraseña se actualizó');
    expect(text).toContain(
      'El proceso terminó correctamente. Ya puedes iniciar sesión con tu nueva contraseña.',
    );
    expect(text).toContain('Ir al inicio de sesión');
  });

  it('should render the success icon above the title', () => {
    const icono = fixture.debugElement.nativeElement.querySelector('.exito-icono');
    const titulo = fixture.debugElement.nativeElement.querySelector('.sgfidm-auth-card__title');
    expect(icono).toBeTruthy();
    expect(icono.compareDocumentPosition(titulo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('should navigate to login', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onIrAlLogin();
    expect(spy).toHaveBeenCalledWith(['/auth/login']);
    spy.mockRestore();
  });
});
