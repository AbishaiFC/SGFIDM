import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ResetPasswordComponent } from './reset-password.component';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { AuthMockRepository } from '../../../../../app/core/services/data/mock/auth.mock.repository';

const routes = RouterTestingModule.withRoutes([
  { path: 'auth/login', component: ResetPasswordComponent },
  { path: 'auth/recover-account', component: ResetPasswordComponent },
]);

async function createComponent(token: string | null): Promise<ComponentFixture<ResetPasswordComponent>> {
  await TestBed.configureTestingModule({
    imports: [ResetPasswordComponent, FormsModule, routes],
    providers: [
      { provide: AuthRepository, useClass: AuthMockRepository },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { queryParamMap: convertToParamMap(token ? { token } : {}) },
        },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(ResetPasswordComponent);
  fixture.detectChanges();
  return fixture;
}

describe('ResetPasswordComponent (AUTH-04)', () => {
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let component: ResetPasswordComponent;

  beforeEach(async () => {
    fixture = await createComponent('token-demo');
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Figma title, subtitle, two password fields and the save button', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Crea una nueva contraseña');
    expect(text).toContain(
      'Define la nueva contraseña de tu cuenta. No necesitas escribir tu correo otra vez.',
    );
    expect(text).toContain('Nueva contraseña');
    expect(text).toContain('Al menos 8 caracteres, una mayúscula y un número.');
    expect(text).toContain('Confirmar nueva contraseña');
    expect(text).toContain('Las contraseñas deben coincidir.');
    expect(text).toContain('Guardar nueva contraseña');
    expect(fixture.debugElement.queryAll(By.css('sgfidm-password-field')).length).toBe(2);
  });

  it('should show the Figma mismatch warning when passwords differ', () => {
    component.nuevaPassword = 'Abc12345';
    component.confirmarPassword = 'Abc12346';
    component.onGuardar();
    fixture.detectChanges();

    const aviso = fixture.debugElement.query(By.css('.reset-password-aviso'));
    expect(aviso.nativeElement.textContent).toContain('CONTRASEÑAS NO COINCIDEN');
    expect(aviso.nativeElement.textContent).toContain('Las contraseñas no coinciden. Inténtalo de nuevo.');
    expect(component.confirmError).toBe('Las contraseñas no coinciden.');
  });

  it('should save with the token from the link and navigate to login', async () => {
    const auth = TestBed.inject(AuthRepository);
    const saveSpy = vi.spyOn(auth, 'restablecerContrasena').mockReturnValue(of(undefined));
    const router = TestBed.inject(Router);
    const navSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.nuevaPassword = 'Abc12345';
    component.confirmarPassword = 'Abc12345';
    component.onGuardar();

    expect(saveSpy).toHaveBeenCalledWith('token-demo', 'Abc12345');
    expect(navSpy).toHaveBeenCalledWith(['/auth/password-reset-success']);
    saveSpy.mockRestore();
    navSpy.mockRestore();
  });

  it('should reject a password without uppercase or number', () => {
    const auth = TestBed.inject(AuthRepository);
    const saveSpy = vi.spyOn(auth, 'restablecerContrasena').mockReturnValue(of(undefined));

    component.nuevaPassword = 'abc12345';
    component.confirmarPassword = 'abc12345';
    component.onGuardar();

    expect(saveSpy).not.toHaveBeenCalled();
    expect(component.errorEyebrow).toBe('CONTRASEÑA NO VÁLIDA');
    saveSpy.mockRestore();
  });
});

describe('ResetPasswordComponent sin token', () => {
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let component: ResetPasswordComponent;

  beforeEach(async () => {
    fixture = await createComponent(null);
    component = fixture.componentInstance;
  });

  it('should show the invalid link state', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Enlace inválido');
    expect(text).toContain('No se pudo abrir el enlace. Solicita uno nuevo para continuar.');
    expect(text).toContain('Solicitar nuevo enlace');
    expect(fixture.debugElement.query(By.css('sgfidm-password-field'))).toBeNull();
  });

  it('should navigate to recover-account to request a new link', async () => {
    const router = TestBed.inject(Router);
    const spy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.onSolicitarNuevoEnlace();

    expect(spy).toHaveBeenCalledWith(['/auth/recover-account']);
    spy.mockRestore();
  });
});
