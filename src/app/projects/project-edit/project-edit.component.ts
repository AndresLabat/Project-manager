import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectValidators } from '../../validators/project.validators';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-project-edit',
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent {
  form;
  successMessage = signal('');
  projectId: number;
  employees: any[] = [];

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employees = this.employeesService.getEmployees();
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    const project = this.projectsService.getProjects().find(p => p.id === this.projectId);

    // Get currently assigned employees
    const assignedEmployees = this.employeesService.getEmployees()
      .filter(emp => emp.assignedProjects.includes(this.projectId))
      .map(emp => emp.id);

    this.form = this.fb.group({
      name: [project?.name || '', ProjectValidators.nameValidators],
      description: [project?.description || '', ProjectValidators.descriptionValidators],
      startDate: [project?.startDate || '', Validators.required],
      endDate: [project?.endDate || ''],
      assignedEmployees: [assignedEmployees]
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

  updateProject(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;
    this.projectsService.updateProject(this.projectId, {
      name: formValue.name || '',
      description: formValue.description || '',
      startDate: formValue.startDate || '',
      endDate: formValue.endDate || ''
    });

    // Update employee assignments
    this.updateEmployeeAssignments(formValue.assignedEmployees || []);

    this.successMessage.set('Project updated successfully!');
    
    setTimeout(() => {
      this.router.navigate(['/projects']);
    }, 1000);
  }

  private updateEmployeeAssignments(newAssignedEmployees: number[]): void {
    // Get current assignments
    const currentAssignedEmployees = this.employeesService.getEmployees()
      .filter(emp => emp.assignedProjects.includes(this.projectId))
      .map(emp => emp.id);

    // Remove employees that are no longer assigned
    currentAssignedEmployees.forEach(employeeId => {
      if (!newAssignedEmployees.includes(employeeId)) {
        this.employeesService.unassignFromProject(employeeId, this.projectId);
      }
    });

    // Add new employees
    newAssignedEmployees.forEach(employeeId => {
      if (!currentAssignedEmployees.includes(employeeId)) {
        this.employeesService.assignToProject(employeeId, this.projectId);
      }
    });
  }
}
