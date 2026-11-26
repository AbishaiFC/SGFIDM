import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { EmployeeVerifyPhoneComponent } from './employee-verify-phone.component';
import { AuthRepository } from '../../../../../app/core/services/data/repositories/auth.repository';

describe('EmployeeVerifyPhoneComponent (AUTH-08)', () => {
  let fixture: ComponentFixture<EmployeeVerifyPhoneComponent>;
  let component: EmployeeVerifyPhoneComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeeVerifyPhoneComponent,
        RouterTestingModule.withRoutes([
          { path: 'auth/employee/access-setup', component: EmployeeVerifyPhoneComponent },
        ]),
      ],
      providers: [{ provide: AuthRepository, useValue: { verificarOTP: vi.fn() } }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeVerifyPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Figma OTP screen', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Código de verificación');
    expect(text).toContain('Enviamos un código de 6 dígitos al teléfono terminado en ******6677');
    expect(text).toContain('El código expira en 05:00');
    expect(text).toContain('Verificar');
    expect(text).toContain('Reenviar código');
  });

  it('should verify the OTP and go to access setup', () => {
    const auth = TestBed.inject(AuthRepository);
    const otpSpy = vi.spyOn(auth, 'verificarOTP').mockReturnValue(of({} as any));
    const navSpy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    component.onVerificar('123456');

    expect(otpSpy).toHaveBeenCalledWith('EMP-001', '123456');
    expect(navSpy).toHaveBeenCalledWith(['/auth/employee/access-setup']);
    otpSpy.mockRestore();
    navSpy.mockRestore();
  });

  it('should reject an incomplete code', () => {
    expect(component).toBeTruthy();
    component.onVerificar('123');
    expect(component.errorMessage).toContain('6 dígitos');
  });
});
