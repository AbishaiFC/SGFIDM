import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { vi } from 'vitest';
import { CategoriasComponent } from './categorias.component';

describe('CategoriasComponent (PROD-05 Solo)', () => {
  let fixture: ComponentFixture<CategoriasComponent>;
  let component: CategoriasComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CategoriasComponent,
        RouterTestingModule.withRoutes([{ path: 'productos', component: CategoriasComponent }]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render the canonical categories table', () => {
    const text = fixture.debugElement.nativeElement.textContent;
    expect(component).toBeTruthy();
    expect(text).toContain('Categorías');
    expect(text).toContain('4 categorías · opcionales · sin categorías predefinidas');
    expect(text).toContain('Volver al catálogo');
    expect(text).toContain('Nueva categoría');
    expect(text).toContain('Café y té');
    expect(text).toContain('CAT-001');
    expect(text).toContain('12');
    expect(fixture.debugElement.nativeElement.querySelectorAll('tbody tr')).toHaveLength(4);
  });

  it('should switch to the empty Archivadas tab', () => {
    component.tab.set('Archivadas');
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('No hay categorías archivadas.');
  });

  it('should go back to the catalog', () => {
    const spy = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    component.volver();
    expect(spy).toHaveBeenCalledWith(['/productos']);
    spy.mockRestore();
  });

  it('should show a ToDo for nueva categoria', () => {
    component.nueva();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.textContent).toContain('PROD-05a');
  });
});
