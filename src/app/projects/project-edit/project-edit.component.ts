import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService, Project } from '../projects.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

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
      name: [project?.name || '', Validators.required],
      description: [project?.description || '']
    });
  }

  updateProject(): void {
    if (this.form.invalid) return;

    this.projectsService.updateProject(this.projectId, {
      name: this.form.value.name!,
      description: this.form.value.description || ''
    });

    this.router.navigate(['/projects']);
  }
}
