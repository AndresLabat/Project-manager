import { Component, computed } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { TasksService } from '../../tasks/tasks.service';
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
    private employeesService: EmployeesService,
    private tasksService: TasksService,
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

  getAssignedEmployees(projectId: number): string[] {
    const employees = this.employeesService.getEmployees();
    const assignedEmployees = employees.filter(emp => 
      emp.assignedProjects.includes(projectId)
    );
    return assignedEmployees.map(emp => emp.fullName);
  }

  getAssignedEmployeesCount(projectId: number): number {
    return this.getAssignedEmployees(projectId).length;
  }

  getAssignedTasksCount(projectId: number): number {
    const tasks = this.tasksService.getTasksByProject(projectId);
    return tasks.length;
  }
}
