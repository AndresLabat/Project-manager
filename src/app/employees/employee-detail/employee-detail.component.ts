import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';
import { ProjectsService } from '../../projects/projects.service';
import { TasksService } from '../../tasks/tasks.service';
import { Employee } from '../employee.model';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';
import { ButtonComponent } from '../../shared/button/button.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, BackButtonComponent, ButtonComponent],
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;
  employeeId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeesService: EmployeesService,
    private projectsService: ProjectsService,
    private tasksService: TasksService,
    public authService: AuthService
  ) {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.employeesService.getEmployeeById(this.employeeId);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const parsedId = idParam ? Number(idParam) : NaN;
      if (!Number.isNaN(parsedId)) {
        this.employeeId = parsedId;
        this.employee = this.employeesService.getEmployeeById(this.employeeId);
      } else {
        this.employee = undefined;
      }
    });
  }

  editEmployee(): void {
    this.router.navigate(['/employees', this.employeeId, 'edit']);
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

  getAssignedProjects() {
    if (!this.employee) return [];
    const projects = this.projectsService.getProjects();
    return projects
      .filter(project => this.employee!.assignedProjects.includes(project.id));
  }

  getAssignedTasks() {
    if (!this.employee) return [];
    const tasks = this.tasksService.getTasks();
    return tasks
      .filter(task => task.assignedEmployeeId === this.employee!.id);
  }

  getAssignedProjectsCount(): number {
    return this.getAssignedProjects().length;
  }

  getAssignedTasksCount(): number {
    return this.getAssignedTasks().length;
  }

  navigateToProject(projectId: number) {
    this.router.navigate(['/projects', projectId]);
  }

  navigateToTask(taskId: number) {
    this.router.navigate(['/tasks', taskId]);
  }
}
