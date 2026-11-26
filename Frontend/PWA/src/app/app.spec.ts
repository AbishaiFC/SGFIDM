import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter, Router } from '@angular/router';
import { vi } from 'vitest';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should hide the sidebar on the POS route', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/pos');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).querySelector('.sidebar-nav')).toBeNull();
  });

  it('should clear the session and go to login on logout', async () => {
    localStorage.setItem('sgfidm-sesion', '{"rol":"Administrador"}');
    localStorage.setItem('sgfidm-usuario', '{"nombre":"Ana López"}');
    const fixture = TestBed.createComponent(App);
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    fixture.componentInstance.cerrarSesion();
    expect(localStorage.getItem('sgfidm-sesion')).toBeNull();
    expect(localStorage.getItem('sgfidm-usuario')).toBeNull();
    expect(spy).toHaveBeenCalledWith(['/auth/login']);
    spy.mockRestore();
  });
});
