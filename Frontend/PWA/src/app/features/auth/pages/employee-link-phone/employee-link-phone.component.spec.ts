import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { vi } from 'vitest';
import { EmployeeLinkPhoneComponent } from './employee-link-phone.component';

describe('EmployeeLinkPhoneComponent (AUTH-10)', () => {
  let fixture: ComponentFixture<EmployeeLinkPhoneComponent>;
  let component: EmployeeLinkPhoneComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeLinkPhoneComponent, FormsModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeLinkPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Figma texts', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Verificación OTP');
    expect(text).toContain('Ingresa tu número de teléfono para recibir un código de verificación.');
    expect(text).toContain('Enviar código');
  });

  it('should reject an invalid phone number', () => {
    component.telefono = '123';
    component.onEnviarCodigo();
    expect(component.errorMessage).toContain('teléfono válido');
  });

  it('should navigate to OTP verification with the phone in state', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.telefono = '55 1234 5678';
    component.onEnviarCodigo();
    expect(spy).toHaveBeenCalledWith(['/auth/employee/verify-phone'], {
      state: { telefono: '55 1234 5678' },
    });
    spy.mockRestore();
  });
});
