import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { Employee } from '../employee.model';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, BackButtonComponent],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent {
  employee: Employee | undefined;
  employeeId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService
  ) {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeesService.getEmployeeById(this.employeeId);
  }

  deleteEmployee(): void {
    if (this.employee) {
      this.employeesService.deleteEmployee(this.employee.id);
      this.router.navigate(['/employees']);
    }
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }
}
