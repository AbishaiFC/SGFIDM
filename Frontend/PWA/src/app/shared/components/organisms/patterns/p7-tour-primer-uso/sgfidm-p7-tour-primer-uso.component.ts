import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SgfidmButtonComponent } from '../../../atoms/button/sgfidm-button.component';

/** DTO de paso del tour (P7). */
export interface P7StepDto {
  title: string;
  message: string;
}

/**
 * SgfidmP7TourPrimerUso — Patrón P7 Tour de primer uso del Design System SGFIDM.
 *
 * P7 "Tour de primer uso": 4 pasos · "Saltar tour" siempre visible · ligado al Usuario, no al dispositivo.
 *
 * Uso:
 *   <sgfidm-p7-tour-primer-uso [steps]="steps" (finish)="onFinish()" />
 */
@Component({
  selector: 'sgfidm-p7-tour-primer-uso',
  standalone: true,
  imports: [CommonModule, SgfidmButtonComponent],
  templateUrl: './sgfidm-p7-tour-primer-uso.component.html',
  styleUrl: './sgfidm-p7-tour-primer-uso.component.scss',
})
export class SgfidmP7TourPrimerUsoComponent {
  /** Pasos del tour. */
  steps = input<P7StepDto[]>([]);

  /** Índice del paso actual. */
  step = signal(0);

  /** Emite al avanzar al siguiente paso. */
  nextStep = output<number>();

  /** Emite al retroceder un paso. */
  prevStep = output<number>();

  /** Emite al saltar el tour ("Saltar tour" siempre visible). */
  skipTour = output<void>();

  /** Emite al finalizar el tour (último paso). */
  finishTour = output<void>();

  /** true si es el último paso. */
  get isLastStep(): boolean {
    return this.step() >= this.steps().length - 1;
  }

  /** Paso actual (de la lista). */
  get currentStep(): P7StepDto | undefined {
    return this.steps()[this.step()];
  }

  onNext(): void {
    if (this.isLastStep) {
      this.finishTour.emit();
    } else {
      this.nextStep.emit(this.step() + 1);
    }
  }

  onPrev(): void {
    this.prevStep.emit(this.step() - 1);
  }

  onSkip(): void {
    this.skipTour.emit();
  }
}
