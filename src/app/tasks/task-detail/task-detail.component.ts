import { Component, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ProjectsService } from '../../projects/projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BackButtonComponent],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  task = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    const taskId = idParam ? +idParam : 0;
    console.log('Loading task with ID:', taskId);
    const foundTask = this.tasksService.getTaskById(taskId);
    console.log('Found task:', foundTask);
    return foundTask;
  });

  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

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

  editTask(): void {
    this.router.navigate(['/tasks', this.task()?.id, 'edit']);
  }

  deleteTask(): void {
    const currentTask = this.task();
    if (currentTask) {
      this.tasksService.deleteTask(currentTask.id);
      this.router.navigate(['/tasks']);
    }
  }

  backToTasks(): void {
    this.router.navigate(['/tasks']);
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

  navigateToProject(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  navigateToEmployee(employeeId: number) {
    this.router.navigate(['/employees', employeeId]);
  }
}
