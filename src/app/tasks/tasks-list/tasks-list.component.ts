import { Component, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
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
    private router: Router,
    public authService: AuthService
  ) {}

  viewDetails(id: number): void {
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
}
