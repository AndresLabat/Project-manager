import { Component, OnInit } from '@angular/core';
import { ProjectsService, Project } from '../projects.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit(): void {
    // Al iniciar el componente, cargamos la lista de proyectos
    this.projects = this.projectsService.getProjects();
  }

  deleteProject(id: number): void {
    // Llamamos al servicio para eliminar el proyecto
    this.projectsService.deleteProject(id);
    // Refrescamos la lista en pantalla
    this.projects = this.projectsService.getProjects();
  }
}
