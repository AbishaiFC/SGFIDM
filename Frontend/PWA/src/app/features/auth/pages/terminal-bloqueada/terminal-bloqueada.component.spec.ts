import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { TerminalBloqueadaComponent } from './terminal-bloqueada.component';

describe('TerminalBloqueadaComponent (AUTH-16)', () => {
  let fixture: ComponentFixture<TerminalBloqueadaComponent>;
  let component: TerminalBloqueadaComponent;

  beforeEach(async () => {
    localStorage.setItem('sgfidm-pin', '123456');
    await TestBed.configureTestingModule({
      imports: [
        TerminalBloqueadaComponent,
        RouterTestingModule.withRoutes([
          { path: 'pos', component: TerminalBloqueadaComponent },
          { path: 'auth/employee/login', component: TerminalBloqueadaComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TerminalBloqueadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => localStorage.removeItem('sgfidm-pin'));

  it('should create and render the blocking screen', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Terminal bloqueada');
    expect(text).toContain('Tu sesión, tu caja y tu carrito siguen protegidos.');
    expect(text).toContain('Intentos fallidos: 0 de 5');
    expect(text).toContain('Desbloquear terminal');
    expect(text).toContain('Usar contraseña completa');
  });

  it('should unlock with the configured PIN and return to POS', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.pinActual.set('123456');
    component.onDesbloquear();
    expect(spy).toHaveBeenCalledWith(['/pos']);
    spy.mockRestore();
  });

  it('should count failed attempts and lock after five', () => {
    for (let i = 0; i < 5; i++) {
      component.pinActual.set('000000');
      component.onDesbloquear();
    }
    expect(component.intentos()).toBe(5);
    expect(component.bloqueada()).toBe(true);
    expect(component.error()).toContain('5 intentos fallidos');
  });

  it('should request full authentication when no PIN is configured', () => {
    localStorage.removeItem('sgfidm-pin');
    const componente = TestBed.createComponent(TerminalBloqueadaComponent).componentInstance;
    expect(componente.pinConfigurado).toBe(false);
  });

  it('should navigate to employee login for full authentication', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.onReautenticar();
    expect(spy).toHaveBeenCalledWith(['/auth/employee/login']);
    spy.mockRestore();
  });
});
