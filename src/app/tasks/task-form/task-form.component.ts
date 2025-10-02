import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { ProjectsService } from '../../projects/projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { Router } from '@angular/router';
import { TaskValidators } from '../../validators/task.validators';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent, FormInputComponent, FormSelectComponent],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  form;
  successMessage = signal('');
  errorMessage = signal('');
  projects;
  employees;

  constructor(
    private fb: FormBuilder,
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.projects = this.projectsService.getProjects();
    this.employees = this.employeesService.getEmployees();
    this.form = this.fb.group({
      title: ['', TaskValidators.titleValidators],
      description: ['', TaskValidators.descriptionValidators],
      projectId: ['', TaskValidators.projectIdValidators],
      assignedEmployeeId: [''],
      status: ['pending', [Validators.required]],
      priority: ['medium', [Validators.required]],
      dueDate: ['', TaskValidators.dueDateValidators]
    });
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

    this.errorMessage.set('');

    const formValue = this.form.value;
    this.tasksService.addTask({
      title: formValue.title || '',
      description: formValue.description || '',
      projectId: +(formValue.projectId || 0),
      assignedEmployeeId: formValue.assignedEmployeeId ? +formValue.assignedEmployeeId : null,
      status: (formValue.status || 'pending') as 'pending' | 'in-progress' | 'completed',
      priority: (formValue.priority || 'medium') as 'low' | 'medium' | 'high',
      dueDate: formValue.dueDate || '',
      createdAt: new Date().toISOString().split('T')[0]
    });

    this.successMessage.set('Task created successfully!');
    setTimeout(() => {
      this.router.navigate(['/tasks']);
    }, 1000);
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
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
