import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { ExportacionesComponent } from './exportaciones.component';

describe('ExportacionesComponent (REP-06 Solo)', () => {
  let fixture: ComponentFixture<ExportacionesComponent>;
  let component: ExportacionesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ExportacionesComponent,
        FormsModule,
        RouterTestingModule.withRoutes([{ path: 'reportes', component: ExportacionesComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ExportacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the export configuration and history', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('PANTALLA REP-06 · EXPORTACIONES');
    expect(text).toContain('37 exportaciones en los últimos 90 días.');
    expect(text).toContain('CONFIGURACIÓN POR DEFECTO');
    expect(text).toContain('SIEMPRE ACTIVO');
    expect(text).toContain('HISTORIAL DE EXPORTACIONES');
    expect(text).toContain('EXP-014');
    expect(text).toContain('Volver a generar →');
    expect(text).toContain('Los archivos exportados no se almacenan en SGFIDM');
    expect(fixture.debugElement.nativeElement.querySelectorAll('.exportaciones-page__fila')).toHaveLength(5);
  });

  it('should return to the reports center', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/reportes']);
    spy.mockRestore();
  });
});
