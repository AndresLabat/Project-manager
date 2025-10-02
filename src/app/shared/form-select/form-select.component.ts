import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormSelectComponent),
      multi: true
    }
  ]
})
export class FormSelectComponent implements ControlValueAccessor, OnInit {
  @Input() label: string = '';
  @Input() type: 'select' | 'textarea' | 'select-multiple' = 'select';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() control?: AbstractControl | null;
  @Input() errorMessage: string = '';
  @Input() options: { value: any, label: string }[] = [];
  @Input() rows: number = 3;
  @Input() multiple: boolean = false;

  value: any = '';
  disabled: boolean = false;

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value || (this.type === 'select-multiple' ? [] : '');
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLSelectElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    
    if (this.control) {
      this.control.setValue(this.value);
    }
  }

  onSelectionChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (this.type === 'select-multiple') {
      const selectedOptions = Array.from(target.selectedOptions).map(option => option.value);
      this.value = selectedOptions;
    } else {
      this.value = target.value;
    }
    this.onChange(this.value);
    
    if (this.control) {
      this.control.setValue(this.value);
    }
  }

  ngOnInit(): void {
    if (this.control) {
      this.value = this.control.value || (this.type === 'select-multiple' ? [] : '');
    }
  }

  onBlur(): void {
    this.onTouched();
    if (this.control) {
      this.control.markAsTouched();
    }
  }

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
