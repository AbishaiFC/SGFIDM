import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmP1FormularioComponent } from './sgfidm-p1-formulario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../../shared.module';



describe('SgfidmP1FormularioComponent', () => {
    let component: SgfidmP1FormularioComponent;
    let fixture: ComponentFixture<SgfidmP1FormularioComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SharedModule, ReactiveFormsModule, FormsModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SgfidmP1FormularioComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have a valid form after setting values', () => {
        component.form.setValue({
            nombre: 'Producto X',
            costo: '10.00',
            precio: '15.00',
            stock: 5,
        });
        expect(component.form.valid).toBeTruthy();
    });

    it('should log the form value on submit when valid', () => {
        const consoleSpy = vi.spyOn(console, 'log');
        component.form.setValue({
            nombre: 'Producto Y',
            costo: '20.00',
            precio: '30.00',
            stock: 10,
        });
        component.onSubmit();
        expect(consoleSpy).toHaveBeenCalledWith('Submitted', component.form.value);
    });
});