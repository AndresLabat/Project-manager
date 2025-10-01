import { Component, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeValidators } from '../../validators/employee.validators';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-edit',
  imports: [CommonModule, ReactiveFormsModule, BackButtonComponent, ButtonComponent],
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent {
  form;
  successMessage = signal('');
  employeeId: number;

  constructor(
    private fb: FormBuilder, 
    private employeesService: EmployeesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    
    const employee = this.employeesService.getEmployeeById(this.employeeId);
    
    this.form = this.fb.group({
      fullName: [employee?.fullName || '', EmployeeValidators.nameValidators],
      email: [employee?.email || '', EmployeeValidators.emailValidators],
      role: [employee?.role || '', EmployeeValidators.roleValidators]
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

  updateEmployee() {
    if (this.form.invalid) return;

    const updatedEmployee: Omit<Employee, 'id'> = {
      fullName: this.form.value.fullName!,
      email: this.form.value.email!,
      role: this.form.value.role!,
      assignedProjects: [],
      assignedTasks: []
    };

    this.employeesService.updateEmployee(this.employeeId, updatedEmployee);
    this.successMessage.set('Employee updated successfully!');
    
    setTimeout(() => {
      this.router.navigate(['/employees']);
    }, 1000);
  }
}
