import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  form;
  successMessage = signal('');
  errorMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      projectId: ['', [Validators.required]],
      assignedEmployeeId: [''],
      status: ['pending', [Validators.required]],
      priority: ['medium', [Validators.required]],
      dueDate: ['', [Validators.required]]
    });
  }

  getTitleErrorMessage(): string {
    if (this.form.get('title')?.hasError('required')) {
      return 'Title is required';
    }
    if (this.form.get('title')?.hasError('minlength')) {
      return 'Title must be at least 3 characters long';
    }
    return '';
  }

  getDescriptionErrorMessage(): string {
    if (this.form.get('description')?.hasError('required')) {
      return 'Description is required';
    }
    if (this.form.get('description')?.hasError('minlength')) {
      return 'Description must be at least 10 characters long';
    }
    return '';
  }

  getProjectIdErrorMessage(): string {
    if (this.form.get('projectId')?.hasError('required')) {
      return 'Project is required';
    }
    return '';
  }

  getDueDateErrorMessage(): string {
    if (this.form.get('dueDate')?.hasError('required')) {
      return 'Due date is required';
    }
    return '';
  }

  addTask(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please fix all errors before submitting');
      return;
    }

    this.errorMessage.set('');

    this.tasksService.addTask({
      title: this.form.value.title!,
      description: this.form.value.description!,
      projectId: +this.form.value.projectId!,
      assignedEmployeeId: this.form.value.assignedEmployeeId ? +this.form.value.assignedEmployeeId : null,
      status: this.form.value.status! as 'pending' | 'in-progress' | 'completed',
      priority: this.form.value.priority! as 'low' | 'medium' | 'high',
      dueDate: this.form.value.dueDate!,
      createdAt: new Date().toISOString().split('T')[0]
    });

    this.successMessage.set('Task created successfully!');
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 1000);
  }
}
