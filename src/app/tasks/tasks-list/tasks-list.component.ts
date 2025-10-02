import { Component, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ProjectsService } from '../../projects/projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ListHeaderComponent } from '../../shared/list-header/list-header.component';
import { ListCardComponent } from '../../shared/list-card/list-card.component';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, ListHeaderComponent, ListCardComponent, StatusBadgeComponent, EmptyStateComponent],
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  tasks = computed(() => this.tasksService.getTasks());

  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private router: Router,
    public authService: AuthService
  ) {}

  viewDetails(id: number): void {
    console.log('Navigating to task:', id);
    this.router.navigate(['/tasks', id]);
  }

  deleteTask(id: number): void {
    this.tasksService.deleteTask(id);
  }

  addTask(): void {
    this.router.navigate(['/tasks/new']);
  }

  editTask(id: number): void {
    this.router.navigate(['/tasks', id, 'edit']);
  }


  getProjectName(projectId: number): string {
    const projects = this.projectsService.getProjects();
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Project Deleted';
  }

  getEmployeeName(employeeId: number | null): string {
    if (!employeeId) return 'Not assigned';
    const employee = this.employeesService.getEmployees().find(e => e.id === employeeId);
    return employee ? employee.fullName : 'Employee Deleted';
  }
}
