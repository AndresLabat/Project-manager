import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { CommonModule } from '@angular/common';
import { ProjectValidators } from '../../validators/project.validators';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
import { FormSelectComponent } from '../../shared/form-select/form-select.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent, FormInputComponent, FormSelectComponent],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent {
  form;
  successMessage = signal('');
  employees: any[] = [];

  constructor(
    private fb: FormBuilder, 
    private projectsService: ProjectsService, 
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.employees = this.employeesService.getEmployees();
    this.form = this.fb.group({
      name: ['', ProjectValidators.nameValidators],
      description: ['', ProjectValidators.descriptionValidators],
      startDate: ['', Validators.required],
      endDate: [''],
      assignedEmployees: [[]]
    }, { validators: ProjectValidators.dateRangeValidator });
  }

  getNameErrorMessage(): string {
    return ProjectValidators.getNameErrorMessage(this.form);
  }

  getDescriptionErrorMessage(): string {
    return ProjectValidators.getDescriptionErrorMessage(this.form);
  }

  getDateRangeErrorMessage(): string {
    return ProjectValidators.getDateRangeErrorMessage(this.form);
  }

  addProject(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    console.log('ProjectForm - Form value:', formValue);
    console.log('ProjectForm - Assigned employees:', formValue.assignedEmployees);
    
    const project = this.projectsService.addProject({
      name: formValue.name || '',
      description: formValue.description || '',
      startDate: formValue.startDate || '',
      endDate: formValue.endDate || ''
    });

    const assignedEmployees = formValue.assignedEmployees as number[] | null;
    if (assignedEmployees && Array.isArray(assignedEmployees) && assignedEmployees.length > 0) {
      assignedEmployees.forEach((employeeId: number) => {
        this.employeesService.assignToProject(employeeId, project.id);
      });
    }

    this.successMessage.set('Project added successfully!');
    setTimeout(() => {
      this.router.navigate(['/projects']);
    }, 1000);
  }

  getEmployeeOptions() {
    return this.employees.map((employee: any) => ({
      value: employee.id.toString(),
      label: `${employee.fullName} (${employee.role})`
    }));
  }
}
