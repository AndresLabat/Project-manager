import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { CommonModule } from '@angular/common';
import { EmployeeValidators } from '../../validators/employee.validators';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent {
  form;
  successMessage = signal('');

  constructor(
    private fb: FormBuilder,
    private employeesService: EmployeesService,
    private router: Router
  ) {
    this.form = this.fb.group({
      fullName: ['', EmployeeValidators.nameValidators],
      email: ['', EmployeeValidators.emailValidators],
      role: ['', EmployeeValidators.roleValidators]
    });
  }

  getNameErrorMessage(): string {
    return EmployeeValidators.getNameErrorMessage(this.form);
  }

  getEmailErrorMessage(): string {
    return EmployeeValidators.getEmailErrorMessage(this.form);
  }

  getRoleErrorMessage(): string {
    return EmployeeValidators.getRoleErrorMessage(this.form);
  }

  addEmployee(): void {
    if (this.form.invalid) return;

    this.employeesService.addEmployee({
      fullName: this.form.value.fullName!,
      email: this.form.value.email!,
      role: this.form.value.role!,
      assignedProjects: [],
      assignedTasks: []
    });

    this.successMessage.set('Employee added successfully!');
    setTimeout(() => {
      this.router.navigate(['/employees']);
    }, 1000);
  }
}
