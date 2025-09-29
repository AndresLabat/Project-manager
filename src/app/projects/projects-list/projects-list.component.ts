import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../projects.service';

@Component({
  selector: 'app-projects-list',
  imports: [],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    this.projects = this.projectsService.getProjects();
  }

  deleteProject(id: number): void {
    this.projectsService.deleteProject(id);
    this.projects = this.projectsService.getProjects();
  }
}