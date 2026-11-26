import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { RegisterComponent } from './register.component';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';
import { AuthMockRepository } from '../../../../../app/core/services/data/mock/auth.mock.repository';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule, RouterTestingModule],
      providers: [{ provide: AuthRepository, useClass: AuthMockRepository }],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render Figma title and subtitle', () => {
    const card = fixture.debugElement.query(By.css('.sgfidm-auth-card'));
    expect(card.nativeElement.textContent).toContain('Crea tu cuenta');
    expect(card.nativeElement.textContent).toContain('Registra la cuenta del administrador principal del negocio.');
  });

  it('should render four fields and the Crear cuenta button', () => {
    // 2 sgfidm-form-field directos + 2 sgfidm-password-field que internamente renderizan 2 sgfidm-form-field más
    expect(fixture.debugElement.queryAll(By.css('sgfidm-password-field')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('sgfidm-form-field')).length).toBe(4);
    expect(fixture.debugElement.nativeElement.textContent).toContain('Crear cuenta');
  });

  it('should show error when passwords do not match', () => {
    component.password = 'abc12345';
    component.confirmPassword = 'abc12346';
    component.onRegister();
    fixture.detectChanges();
    expect(component.errorMessage).toContain('Las contraseñas no coinciden');
    expect(fixture.debugElement.query(By.css('.register-error-aviso'))).toBeTruthy();
  });

  it('should call crearCuenta on valid register', () => {
    component.nombre = 'Ana Martínez';
    component.email = 'a@b.com';
    component.password = 'Abc12345';
    component.confirmPassword = 'Abc12345';
    const auth = TestBed.inject(AuthRepository) as AuthRepository;
    const spy = vi.spyOn(auth, 'crearCuenta').mockReturnValue({ subscribe: () => ({}) } as never);
    component.onRegister();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
