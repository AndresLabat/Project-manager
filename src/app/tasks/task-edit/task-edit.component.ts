import { Component, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { ProjectsService } from '../../projects/projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskValidators } from '../../validators/task.validators';
import { Task } from '../task.model';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent, FormInputComponent, FormSelectComponent],
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  form: any;
  successMessage = signal('');
  errorMessage = signal('');
  projects: any;
  employees: any;
  taskId: number;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.projects = this.projectsService.getProjects();
    this.employees = this.employeesService.getEmployees();
    
    const idParam = this.route.snapshot.paramMap.get('id');
    this.taskId = idParam ? +idParam : 0;
  }

  ngOnInit() {
    const task = this.tasksService.getTaskById(this.taskId);
    if (task) {
      const createdAtDate = task.createdAt.split('T')[0];
      
      this.form = this.fb.group({
        title: [task.title, TaskValidators.titleValidators],
        description: [task.description, TaskValidators.descriptionValidators],
        projectId: [task.projectId, TaskValidators.projectIdValidators],
        assignedEmployeeId: [task.assignedEmployeeId],
        status: [task.status],
        priority: [task.priority],
        dueDate: [task.dueDate, TaskValidators.dueDateValidators]
      });
    } else {
      this.router.navigate(['/tasks']);
    }
  }

  getDescriptionErrorMessage(): string {
    return TaskValidators.getDescriptionErrorMessage(this.form);
  }

  getProjectIdErrorMessage(): string {
    return TaskValidators.getProjectIdErrorMessage(this.form);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Please fix all errors before submitting');
      return;
    }
    
    const formValue = this.form.value;
    const taskData: Omit<Task, 'id' | 'createdAt'> = {
      title: formValue.title || '',
      description: formValue.description || '',
      projectId: +(formValue.projectId || 0),
      assignedEmployeeId: formValue.assignedEmployeeId ? +formValue.assignedEmployeeId : null,
      status: (formValue.status || 'pending') as 'pending' | 'in-progress' | 'completed',
      priority: (formValue.priority || 'medium') as 'low' | 'medium' | 'high',
      dueDate: formValue.dueDate || ''
    };

    this.tasksService.updateTask(this.taskId, taskData);
    this.successMessage.set('Task updated successfully!');
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 1000);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  getTaskCreatedDate(): string {
    const task = this.tasksService.getTaskById(this.taskId);
    return task ? task.createdAt.split('T')[0] : this.getTodayDate();
  }

  getProjectOptions() {
    return this.projects.map((project: any) => ({
      value: project.id.toString(),
      label: project.name
    }));
  }

  getEmployeeOptions() {
    const options = [{ value: '', label: 'No assignment' }];
    return options.concat(this.employees.map((employee: any) => ({
      value: employee.id.toString(),
      label: employee.fullName
    })));
  }

  getStatusOptions() {
    return [
      { value: 'pending', label: 'Pending' },
      { value: 'in-progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' }
    ];
  }

  getPriorityOptions() {
    return [
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ];
  }
}
