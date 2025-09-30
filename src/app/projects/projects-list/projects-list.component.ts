import { Component, computed } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  projects = computed(() => this.projectsService.projects());

  constructor(private projectsService: ProjectsService) {}

  deleteProject(id: number): void {
    this.projectsService.deleteProject(id);
  }
}
