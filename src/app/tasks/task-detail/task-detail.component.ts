import { Component, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
import { ProjectsService } from '../../projects/projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ClickableLinkComponent } from '../../shared/clickable-link/clickable-link.component';
import { StatusBadgeComponent } from '../../shared/status-badge/status-badge.component';
import { DetailCardComponent } from '../../shared/detail-card/detail-card.component';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, ClickableLinkComponent, StatusBadgeComponent, DetailCardComponent],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
  task = computed(() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    const taskId = idParam ? +idParam : 0;
    const foundTask = this.tasksService.getTaskById(taskId);
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
