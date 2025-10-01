import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { CommonModule } from '@angular/common';
import { ProjectValidators } from '../../validators/project.validators';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  form;
  successMessage = signal('');

  constructor(private fb: FormBuilder, private projectsService: ProjectsService, private router: Router) {
    this.form = this.fb.group({
      name: ['', ProjectValidators.nameValidators],
      description: ['', ProjectValidators.descriptionValidators],
      startDate: ['', Validators.required],
      endDate: ['']
    }, { validators: ProjectValidators.dateRangeValidator });
  }

  getNameErrorMessage(): string {
    return ProjectValidators.getNameErrorMessage(this.form);
  }

  getDescriptionErrorMessage(): string {
    return ProjectValidators.getDescriptionErrorMessage(this.form);
  }

  getDateRangeErrorMessage(): string {
    return ProjectValidators.getDateRangeErrorMessage(this.form);
  }

  addProject(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    this.projectsService.addProject({
      name: formValue.name || '',
      description: formValue.description || '',
      startDate: formValue.startDate || '',
      endDate: formValue.endDate || ''
    });

    this.successMessage.set('Project added successfully!');
    setTimeout(() => {
      this.router.navigate(['/projects']);
    }, 1000);
  }
}
