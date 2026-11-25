import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SgfidmP7TourPrimerUsoComponent, P7StepDto } from './sgfidm-p7-tour-primer-uso.component';
import { SharedModule } from '../../../../shared.module';

describe('SgfidmP7TourPrimerUsoComponent', () => {
  let component: SgfidmP7TourPrimerUsoComponent;
  let fixture: ComponentFixture<SgfidmP7TourPrimerUsoComponent>;

  const steps: P7StepDto[] = [
    { title: 'Paso 1', message: 'Primer paso del tour' },
    { title: 'Paso 2', message: 'Segundo paso del tour' },
    { title: 'Paso 3', message: 'Tercer paso del tour' },
    { title: 'Paso 4', message: 'Cuarto paso del tour' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SgfidmP7TourPrimerUsoComponent, SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SgfidmP7TourPrimerUsoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', steps);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 steps', () => {
    expect(component.steps().length).toBe(4);
  });

  it('should start at step 0', () => {
    expect(component.step()).toBe(0);
    expect(component.isLastStep).toBe(false);
  });

  it('should be last step on step 3', () => {
    component.step.set(3);
    expect(component.isLastStep).toBe(true);
  });

  it('should emit nextStep on next', () => {
    let emitted: number | undefined;
    component.nextStep.subscribe((e) => (emitted = e));
    const nextBtn = fixture.debugElement.query(By.css('.p7-tour__actions sgfidm-button:last-child'));
    nextBtn.nativeElement.click();
    fixture.detectChanges();
    expect(emitted).toBe(1);
  });

  it('should emit finishTour on next in last step', () => {
    component.step.set(3);
    let finished = false;
    component.finishTour.subscribe(() => (finished = true));
    const nextBtn = fixture.debugElement.query(By.css('.p7-tour__actions sgfidm-button:last-child'));
    nextBtn.nativeElement.click();
    fixture.detectChanges();
    expect(finished).toBeTruthy();
  });

  it('should emit skipTour on skip button', () => {
    let skipped = false;
    component.skipTour.subscribe(() => (skipped = true));
    const skipBtn = fixture.debugElement.query(By.css('.p7-tour__skip sgfidm-button'));
    skipBtn.nativeElement.click();
    fixture.detectChanges();
    expect(skipped).toBeTruthy();
  });
});
