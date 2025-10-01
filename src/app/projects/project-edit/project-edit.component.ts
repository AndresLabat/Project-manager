import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectValidators } from '../../validators/project.validators';

@Component({
  selector: 'app-project-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {
  form;
  projectId: number;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    const project = this.projectsService.getProjects().find(p => p.id === this.projectId);

    this.form = this.fb.group({
      name: [project?.name || '', ProjectValidators.nameValidators],
      description: [project?.description || '', ProjectValidators.descriptionValidators],
      startDate: [project?.startDate || '', Validators.required],
      endDate: [project?.endDate || '']
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

  updateProject(): void {
    if (this.form.invalid) return;

    this.projectsService.updateProject(this.projectId, {
      name: this.form.value.name!,
      description: this.form.value.description || '',
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate || ''
    });

    this.router.navigate(['/projects']);
  }

  goBack(): void {
    this.router.navigate(['/projects']);
  }
}
