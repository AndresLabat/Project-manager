import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export class ProjectValidators {
  static nameValidators = [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(100),
    Validators.pattern(/^[a-zA-Z0-9\s\-_.,()]+$/)
  ];

  static descriptionValidators = [
    Validators.maxLength(500),
    Validators.pattern(/^[a-zA-Z0-9\s\-_.,()!?@#$%&*+/=:;'"<>[\]{}|\\~`]*$/)
  ];

  static dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { dateRange: true };
    }
    
    return null;
  }

  static getNameErrorMessage(form: AbstractControl): string {
    const nameControl = form.get('name');
    if (nameControl?.hasError('required')) {
      return 'Project name is required';
    }
    if (nameControl?.hasError('minlength')) {
      return 'Project name must be at least 1 character long';
    }
    if (nameControl?.hasError('maxlength')) {
      return 'Project name must be no more than 100 characters long';
    }
    if (nameControl?.hasError('pattern')) {
      return 'Project name can only contain letters, numbers, spaces, and basic punctuation';
    }
    return '';
  }

  static getDescriptionErrorMessage(form: AbstractControl): string {
    const descControl = form.get('description');
    if (descControl?.hasError('maxlength')) {
      return 'Description must be no more than 500 characters long';
    }
    if (descControl?.hasError('pattern')) {
      return 'Description contains invalid characters';
    }
    return '';
  }

  static getDateRangeErrorMessage(form: AbstractControl): string {
    if (form.hasError('dateRange')) {
      return 'End date must be after start date';
    }
    return '';
  }
}
