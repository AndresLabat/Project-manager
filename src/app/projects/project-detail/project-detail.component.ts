import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { EmployeesService } from '../../employees/employees.service';
import { TasksService } from '../../tasks/tasks.service';
import { Project } from '../project.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { BackButtonComponent } from '../../shared/back-button/back-button.component';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, ButtonComponent, BackButtonComponent],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  project: Project | undefined;
  projectId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private employeesService: EmployeesService,
    private tasksService: TasksService,
    public authService: AuthService
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.projectsService.getProjects().find(p => p.id === this.projectId);
  }

  deleteProject() {
    if (this.project) {
      this.projectsService.deleteProject(this.project.id);
      this.router.navigate(['/projects']);
    }
  }

  editProject() {
    this.router.navigate(['/projects', this.projectId, 'edit']);
  }

  goBack() {
    this.router.navigate(['/projects']);
  }

  getAssignedEmployees(): string[] {
    const employees = this.employeesService.getEmployees();
    const assignedEmployees = employees.filter(emp => 
      emp.assignedProjects.includes(this.projectId)
    );
    return assignedEmployees.map(emp => emp.fullName);
  }

  getAssignedTasks(): string[] {
    const tasks = this.tasksService.getTasksByProject(this.projectId);
    return tasks.map(task => task.title);
  }

  getAssignedEmployeesCount(): number {
    return this.getAssignedEmployees().length;
  }

  getAssignedTasksCount(): number {
    return this.getAssignedTasks().length;
  }
}
