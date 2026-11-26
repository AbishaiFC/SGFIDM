import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { vi } from 'vitest';
import { EmployeeLoginComponent } from './employee-login.component';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';

describe('EmployeeLoginComponent (AUTH-07)', () => {
  let fixture: ComponentFixture<EmployeeLoginComponent>;
  let component: EmployeeLoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeLoginComponent,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth/employee/verify-phone', component: EmployeeLoginComponent },
        ]),
      ],
      providers: [{ provide: AuthRepository, useValue: { loginEmpleado: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Figma texts', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Acceso de empleado');
    expect(text).toContain('Ingresa tu código de empleado y contraseña para acceder.');
    expect(text).toContain('Formato: EMP-XXX');
    expect(text).toContain('Recuperar contraseña');
    expect(text).toContain('Verificación por OTP');
  });

  it('should login and navigate to OTP passing the employee code', () => {
    vi.spyOn(TestBed.inject(AuthRepository), 'loginEmpleado').mockReturnValue(of({} as any));
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.codigo = 'EMP-001';
    component.password = 'Abc12345';

    component.onLogin();

    expect(spy).toHaveBeenCalledWith(['/auth/employee/verify-phone'], {
      state: { codigo: 'EMP-001' },
    });
    spy.mockRestore();
  });

  it('should show an error when credentials fail', () => {
    vi.spyOn(TestBed.inject(AuthRepository), 'loginEmpleado').mockReturnValue(
      new Observable((sub) => sub.error(new Error('bad credentials'))),
    );
    component.onLogin();
    expect(component.errorMessage).toContain('Credenciales inválidas');
  });
});
