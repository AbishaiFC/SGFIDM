import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { EmployeeAcceptInvitationComponent } from './employee-accept-invitation.component';

describe('EmployeeAcceptInvitationComponent (AUTH-12)', () => {
  let fixture: ComponentFixture<EmployeeAcceptInvitationComponent>;
  let component: EmployeeAcceptInvitationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAcceptInvitationComponent, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { queryParamMap: convertToParamMap({ nombre: 'María López', codigo: 'EMP-006' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAcceptInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the invitation data and Figma texts', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Únete a INKO');
    expect(text).toContain('Invitación para: María López');
    expect(text).toContain('Código de empleado asignado: EMP-006');
    expect(text).toContain('Crea tu contraseña para activar tu cuenta.');
    expect(text).toContain('Aceptar invitación y crear cuenta');
  });

  it('should reject mismatched passwords', () => {
    component.password = 'Abc12345';
    component.confirmarPassword = 'Abc12346';
    component.onAceptar();
    expect(component.errorMessage).toContain('no coinciden');
    expect(component.confirmError).toContain('no coinciden');
  });

  it('should accept the invitation and go to the employee login', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.password = 'Abc12345';
    component.confirmarPassword = 'Abc12345';
    component.onAceptar();
    expect(spy).toHaveBeenCalledWith(['/auth/employee/login']);
    spy.mockRestore();
  });
});
