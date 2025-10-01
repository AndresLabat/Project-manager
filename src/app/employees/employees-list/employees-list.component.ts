import { Component, computed } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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
    private router: Router
  ) {}

  viewDetails(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  deleteEmployee(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este empleado?')) {
      this.employeesService.deleteEmployee(id);
    }
  }
}

