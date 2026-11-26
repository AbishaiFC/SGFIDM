import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { EmployeeSetPasswordComponent } from './employee-set-password.component';

describe('EmployeeSetPasswordComponent (AUTH-11)', () => {
  let fixture: ComponentFixture<EmployeeSetPasswordComponent>;
  let component: EmployeeSetPasswordComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSetPasswordComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render the Figma texts', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Crea tu contraseña personal');
    expect(text).toContain('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
    expect(text).toContain('Al menos 8 caracteres, una mayúscula y un número.');
    expect(text).toContain('Las contraseñas deben coincidir.');
    expect(text).toContain('Guardar contraseña');
  });

  it('should show the mismatch warning', () => {
    component.nuevaPassword = 'Abc12345';
    component.confirmarPassword = 'Abc12346';
    component.onGuardar();
    expect(component.errorMessage).toContain('no coinciden');
    expect(component.confirmError).toContain('no coinciden');
  });

  it('should navigate to the dashboard with a valid password', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.nuevaPassword = 'Abc12345';
    component.confirmarPassword = 'Abc12345';
    component.onGuardar();
    expect(spy).toHaveBeenCalledWith(['/dashboard/select-branch']);
    spy.mockRestore();
  });
});
