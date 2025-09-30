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
      name: ['', Validators.required],
      description: [''],
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
