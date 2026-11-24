import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SgfidmEmptyStateComponent } from './sgfidm-empty-state.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [SgfidmEmptyStateComponent],
  template: `
    <sgfidm-empty-state
      icon="folder_off"
      title="Sin datos todavía"
      message="Cuando registres el primer movimiento aparecerá aquí."
      actionLabel="Registrar movimiento"
      (action)="onAction()"
    ></sgfidm-empty-state>
  `,
})
class TestHostComponent {
  onAction(): void {}
}

describe('SgfidmEmptyStateComponent', () => {
  let fixture: ComponentFixture<SgfidmEmptyStateComponent>;
  let component: SgfidmEmptyStateComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmEmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmEmptyStateComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Sin datos todavía');
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.sgfidm-empty-state__title'));
    expect(title.nativeElement.textContent).toContain('Sin datos todavía');
  });

  it('should render default icon', () => {
    const icon = fixture.debugElement.query(By.css('.sgfidm-empty-state__icon .material-icons'));
    expect(icon.nativeElement.textContent).toContain('folder_off');
  });

  it('should render message when provided', () => {
    fixture.componentRef.setInput('message', 'Texto de prueba');
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.sgfidm-empty-state__message'));
    expect(message.nativeElement.textContent).toContain('Texto de prueba');
  });

  it('should not render message when empty', () => {
    fixture.componentRef.setInput('message', '');
    fixture.detectChanges();
    const message = fixture.debugElement.query(By.css('.sgfidm-empty-state__message'));
    expect(message).toBeNull();
  });

  it('should render action button when actionLabel provided', () => {
    fixture.componentRef.setInput('actionLabel', 'Crear');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('sgfidm-button'));
    expect(button).toBeTruthy();
    expect(button.nativeElement.textContent).toContain('Crear');
  });

  it('should not render action button when actionLabel empty', () => {
    fixture.componentRef.setInput('actionLabel', '');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('sgfidm-button'));
    expect(button).toBeNull();
  });

  it('should emit action on button click', () => {
    let emitted = false;
    component.action.subscribe(() => (emitted = true));
    fixture.componentRef.setInput('actionLabel', 'Aceptar');
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('sgfidm-button'));
    button.triggerEventHandler('click', null);
    expect(emitted).toBe(true);
  });

  it('should have role status on wrapper', () => {
    const wrapper = fixture.debugElement.query(By.css('.sgfidm-empty-state'));
    expect(wrapper.nativeElement.getAttribute('role')).toBe('status');
  });
});
