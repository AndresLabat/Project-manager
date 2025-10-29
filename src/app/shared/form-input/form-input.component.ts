import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true
    }
  ]
})
export class FormInputComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() control?: AbstractControl | null;
  @Input() errorMessage: string = '';

  value: string = '';
  disabled: boolean = false;

  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    
    if (this.control) {
      this.control.setValue(this.value);
    }
  }

  ngOnInit(): void {
    if (this.control) {
      this.value = this.control.value || '';
    }
  }

  onBlur(): void {
    this.onTouched();
    if (this.control) {
      this.control.markAsTouched();
    }
  }

  onFocus(): void {}

  get hasError(): boolean {
    if (!this.control) return false;
    
    const fieldError = this.control.invalid && this.control.touched;
    
    const formError = this.control.parent?.errors?.['dateRange'] && 
                      this.control.touched && 
                      this.label.toLowerCase().includes('end date');
    
    return fieldError || formError;
  }

  get displayErrorMessage(): string {
    return this.errorMessage || this.getDefaultErrorMessage();
  }

  getFieldId(): string {
    return this.label.toLowerCase().replace(/\s+/g, '-');
  }

  private getDefaultErrorMessage(): string {
    if (!this.control) return '';
    
    const errors = this.control.errors;
    const parentErrors = this.control.parent?.errors;
    
    if (parentErrors?.['dateRange'] && this.label.toLowerCase().includes('end date')) {
      return `End date cannot be before start date`;
    }
    
    if (errors?.['required']) return `${this.label} is required`;
    if (errors?.['minlength']) return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;
    if (errors?.['maxlength']) return `${this.label} must not exceed ${errors['maxlength'].requiredLength} characters`;
    if (errors?.['email']) return 'Please enter a valid email address';
    if (errors?.['dueDateInPast']) return 'Due date cannot be in the past';
    
    return 'Invalid input';
  }
}
