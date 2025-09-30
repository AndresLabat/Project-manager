import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  form;
  successMessage = signal('');

  constructor(private fb: FormBuilder, private projectsService: ProjectsService) {
    this.form = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(100),
        Validators.pattern(/^[a-zA-Z0-9\s\-_.,()]+$/)
      ]],
      description: ['', [
        Validators.maxLength(500),
        Validators.pattern(/^[a-zA-Z0-9\s\-_.,()!?@#$%&*+/=:;'"<>[\]{}|\\~`]*$/)
      ]],
      startDate: ['', Validators.required],
      endDate: ['']
    }, { validators: this.dateRangeValidator });
  }

  private dateRangeValidator(control: AbstractControl): ValidationErrors | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;
    
    if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
      return { dateRange: true };
    }
    
    return null;
  }

  getNameErrorMessage(): string {
    const nameControl = this.form.get('name');
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

  getDescriptionErrorMessage(): string {
    const descControl = this.form.get('description');
    if (descControl?.hasError('maxlength')) {
      return 'Description must be no more than 500 characters long';
    }
    if (descControl?.hasError('pattern')) {
      return 'Description contains invalid characters';
    }
    return '';
  }

  addProject(): void {
    if (this.form.invalid) return;

    this.projectsService.addProject({
      name: this.form.value.name!,
      description: this.form.value.description || '',
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate || ''
    });

    this.form.reset();
    this.successMessage.set('Project added successfully!');
    setTimeout(() => this.successMessage.set(''), 3000);
  }
}
