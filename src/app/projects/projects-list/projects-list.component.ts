import { Component, computed } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-projects-list',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent {
  projects = computed(() => this.projectsService.projects());

  constructor(
    private projectsService: ProjectsService, 
    private router: Router,
    public authService: AuthService
  ) {}

  deleteProject(id: number): void {
    this.projectsService.deleteProject(id);
  }

  editProject(id: number): void {
    this.router.navigate(['/projects', id, 'edit']);
  }

  viewDetails(id: number) {
    this.router.navigate(['/projects', id]);
  }

  addProject(): void {
    this.router.navigate(['/projects/new']);
  }
}
