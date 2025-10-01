import { Component, computed } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-employees-list',
  imports: [CommonModule],
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  employees = computed(() => this.employeesService.getEmployees());

  constructor(
    private employeesService: EmployeesService,
    private router: Router,
    public authService: AuthService
  ) {}

  viewDetails(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  deleteEmployee(id: number): void {
    this.employeesService.deleteEmployee(id);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }
}

