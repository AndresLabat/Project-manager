import { Component, computed } from '@angular/core';
import { TasksService } from '../tasks.service';
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
    const taskId = +this.route.snapshot.paramMap.get('id')!;
    console.log('Loading task with ID:', taskId);
    const foundTask = this.tasksService.getTaskById(taskId);
    console.log('Found task:', foundTask);
    return foundTask;
  });

  constructor(
    private tasksService: TasksService,
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
    if (this.task()) {
      this.tasksService.deleteTask(this.task()!.id);
      this.router.navigate(['/tasks']);
    }
  }

  backToTasks(): void {
    this.router.navigate(['/tasks']);
  }
}
