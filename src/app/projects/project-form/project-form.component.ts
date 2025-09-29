import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  projectName = '';
  projectDescription = '';

  constructor(private projectsService: ProjectsService) {}

  addProject(): void {
    if (!this.projectName.trim()) return;

    this.projectsService.addProject({
      name: this.projectName,
      description: this.projectDescription,
      startDate: new Date().toISOString().split('T')[0],
      endDate: ''
    });

    this.projectName = '';
    this.projectDescription = '';
  }
}
