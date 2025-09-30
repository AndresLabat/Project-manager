import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService, Project } from '../projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  project: Project | undefined;
  projectId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.projectsService.getProjects().find(p => p.id === this.projectId);
  }

  deleteProject() {
    if (this.project) {
      this.projectsService.deleteProject(this.project.id);
      this.router.navigate(['/projects']);
    }
  }

  editProject() {
    this.router.navigate(['/projects', this.projectId, 'edit']);
  }
}
