import { Component, computed } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  imports: [],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  projects = computed(() => this.projectsService.projects());

  constructor(private projectsService: ProjectsService, private router: Router) {}

  deleteProject(id: number): void {
    this.projectsService.deleteProject(id);
  }

  editProject(id: number): void {
    this.router.navigate(['/projects', id, 'edit']);
  }
}
