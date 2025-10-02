import { AbstractControl, Validators } from '@angular/forms';

export class EmployeeValidators {
  static nameValidators = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100),
    Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
  ];

  static emailValidators = [
    Validators.required,
    Validators.email,
    Validators.maxLength(100)
  ];

  static roleValidators = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50),
    Validators.pattern(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s\-/]+$/)
  ];

  static getNameErrorMessage(form: AbstractControl): string {
    const nameControl = form.get('fullName');
    if (nameControl?.hasError('required')) {
      return 'Full name is required';
    }
    if (nameControl?.hasError('minlength')) {
      return 'Full name must be at least 3 characters long';
    }
    if (nameControl?.hasError('maxlength')) {
      return 'Full name must be no more than 100 characters long';
    }
    if (nameControl?.hasError('pattern')) {
      return 'Full name can only contain letters and spaces';
    }
    return '';
  }

  static getEmailErrorMessage(form: AbstractControl): string {
    const emailControl = form.get('email');
    if (emailControl?.hasError('required')) {
      return 'Email is required';
    }
    if (emailControl?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (emailControl?.hasError('maxlength')) {
      return 'Email must be no more than 100 characters long';
    }
    return '';
  }

  static getRoleErrorMessage(form: AbstractControl): string {
    const roleControl = form.get('role');
    if (roleControl?.hasError('required')) {
      return 'Role is required';
    }
    if (roleControl?.hasError('minlength')) {
      return 'Role must be at least 2 characters long';
    }
    if (roleControl?.hasError('maxlength')) {
      return 'Role must be no more than 50 characters long';
    }
    if (roleControl?.hasError('pattern')) {
      return 'Role contains invalid characters';
    }
    return '';
  }
}
