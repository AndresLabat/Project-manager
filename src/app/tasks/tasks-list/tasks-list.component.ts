import { Component, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ProjectsService } from '../../projects/projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-tasks-list',
  imports: [CommonModule, ButtonComponent],
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

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
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
