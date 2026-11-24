import { Component, input, output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * SgfidmSearchBar — Molécula de barra de búsqueda del Design System SGFIDM.
 *
 * Campo de búsqueda simple (320×44 px) sobre superficie-variant #F5F5F5.
 * Anatomía (Figma `SGFIDM/Search bar` 195:2821): placeholder "Buscar productos,
 * ventas, empleados…" en text-muted #8B8B8B.
 *
 * Uso:
 *   <sgfidm-search-bar [(ngModel)]="query" (search)="onSearch()" />
 */
@Component({
  selector: 'sgfidm-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sgfidm-search-bar.component.html',
  styleUrl: './sgfidm-search-bar.component.scss',
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => SgfidmSearchBarComponent), multi: true },
  ],
})
export class SgfidmSearchBarComponent implements ControlValueAccessor {
  // ── Inputs ─────────────────────────────────────────────────────────────────
  placeholder = input<string>('Buscar productos, ventas, empleados…');
  disabled = input(false);

  // ── Outputs ────────────────────────────────────────────────────────────────
  search = output<void>();

  // ── Value (ControlValueAccessor) ──────────────────────────────────────────
  private _value = '';
  private _onChange: ((v: string) => void) | null = null;
  private _onTouched: (() => void) | null = null;

  get value(): string {
    return this._value;
  }

  set value(v: string) {
    this._value = v;
  }

  writeValue(obj: string | null): void {
    this._value = obj ?? '';
  }

  registerOnChange(fn: (v: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Mutable via input, store as private for CVA compliance
    this._disabled = isDisabled;
  }

  private _disabled = false;

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this._value = input.value;
    this._onChange?.(this._value);
  }

  onBlur(): void {
    this._onTouched?.();
  }

  onClear(): void {
    this._value = '';
    this._onChange?.('');
    this.search.emit();
  }

  onSearchKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.search.emit();
    }
  }

  hasValue(): boolean {
    return !!this._value;
  }
}
