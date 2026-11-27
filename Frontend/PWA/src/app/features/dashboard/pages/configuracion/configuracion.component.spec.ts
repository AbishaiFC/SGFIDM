import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ConfiguracionComponent } from './configuracion.component';

describe('ConfiguracionComponent (CONF-01)', () => {
  let fixture: ComponentFixture<ConfiguracionComponent>;
  let component: ConfiguracionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfiguracionComponent,
        RouterTestingModule.withRoutes([
          { path: 'dashboard/configuracion/mi-perfil', component: ConfiguracionComponent },
        ]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the canonical eight configuration rows', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(text).toContain('Configuración');
    expect(text).toContain('Administra tu negocio, la seguridad y los métodos de pago.');
    expect(text).toContain('Negocio');
    expect(text).toContain('Seguridad');
    expect(text).toContain('Métodos de pago');
    expect(text).toContain('Categorías de productos');
    expect(text).toContain('Categorías financieras');
    expect(text).toContain('Preferencias de notificaciones');
    expect(text).toContain('Mi perfil');
    expect(text).toContain('Auditoría');
    expect(fixture.debugElement.queryAll(By.css('.configuracion-row')).length).toBe(8);
  });

  it('should render all Abrir buttons enabled', () => {
    const botones = fixture.debugElement.queryAll(By.css('sgfidm-button button'));
    expect(botones).toHaveLength(8);
    expect(botones.every((b) => !b.nativeElement.disabled)).toBe(true);
  });

  it('should navigate to Mi perfil from its row', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    component.abrir(component.opciones[6]);
    expect(spy).toHaveBeenCalledWith('/dashboard/configuracion/mi-perfil');
    spy.mockRestore();
  });

  it('should link Negocio to the business configuration page', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    component.abrir(component.opciones[0]);
    expect(spy).toHaveBeenCalledWith('/inicio/configurar');
    spy.mockRestore();
  });

  it('should show a ToDo notice for destinations not yet implemented', () => {
    component.abrir(component.opciones[1]);
    fixture.detectChanges();
    expect(component.aviso()).toContain('CONF-04');
    expect(fixture.debugElement.nativeElement.textContent).toContain('pendiente de implementar');
  });
});
