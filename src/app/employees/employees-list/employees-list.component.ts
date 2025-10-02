import { Component, computed, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { TasksService } from '../../tasks/tasks.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ListHeaderComponent } from '../../shared/list-header/list-header.component';
import { ListCardComponent } from '../../shared/list-card/list-card.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';

@Component({
  selector: 'app-employees-list',
  imports: [CommonModule, ListHeaderComponent, ListCardComponent, EmptyStateComponent],
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {
  employees = computed(() => this.employeesService.getEmployees());

  constructor(
    private employeesService: EmployeesService,
    private tasksService: TasksService,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.tasksService.syncEmployeeTaskAssignments();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/employees', id]);
  }

  deleteEmployee(id: number): void {
    this.employeesService.deleteEmployee(id);
  }

  addEmployee(): void {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(id: number): void {
    this.router.navigate(['/employees', id, 'edit']);
  }
}
