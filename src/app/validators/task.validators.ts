import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export class TaskValidators {
  static titleValidators = [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(100)
  ];

  static descriptionValidators = [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(500)
  ];

  static projectIdValidators = [
    Validators.required
  ];

  static dueDateValidators = [
    Validators.required,
    this.dueDateNotInPastValidator()
  ];

  static dueDateNotInPastValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const dueDate = new Date(control.value);
      dueDate.setHours(0, 0, 0, 0);
      
      if (dueDate < today) {
        return { dueDateInPast: true };
      }
      
      return null;
    };
  }

  static getTitleErrorMessage(form: AbstractControl): string {
    const titleControl = form.get('title');
    if (titleControl?.hasError('required')) {
      return 'Title is required';
    }
    if (titleControl?.hasError('minlength')) {
      return 'Title must be at least 3 characters long';
    }
    if (titleControl?.hasError('maxlength')) {
      return 'Title must not exceed 100 characters';
    }
    return '';
  }

  static getDescriptionErrorMessage(form: AbstractControl): string {
    const descriptionControl = form.get('description');
    if (descriptionControl?.hasError('required')) {
      return 'Description is required';
    }
    if (descriptionControl?.hasError('minlength')) {
      return 'Description must be at least 10 characters long';
    }
    if (descriptionControl?.hasError('maxlength')) {
      return 'Description must not exceed 500 characters';
    }
    return '';
  }

  static getProjectIdErrorMessage(form: AbstractControl): string {
    const projectIdControl = form.get('projectId');
    if (projectIdControl?.hasError('required')) {
      return 'Project is required';
    }
    return '';
  }

  static getDueDateErrorMessage(form: AbstractControl): string {
    const dueDateControl = form.get('dueDate');
    if (dueDateControl?.hasError('required')) {
      return 'Due date is required';
    }
    if (dueDateControl?.hasError('dueDateInPast')) {
      return 'Due date cannot be in the past';
    }
    return '';
  }
}
