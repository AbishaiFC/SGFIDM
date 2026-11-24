import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared.module';

@Component({
  selector: 'sgfidm-p1-formulario',
  standalone: true,
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sgfidm-p1-formulario.component.html',
  styleUrl: './sgfidm-p1-formulario.component.scss',
})
export class SgfidmP1FormularioComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      precio: ['', Validators.required],
      stock: [0, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Submitted', this.form.value);
    }
  }
}
