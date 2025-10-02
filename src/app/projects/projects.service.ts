import { Injectable, signal } from '@angular/core';
import { Project } from './project.model';
import { EmployeesService } from '../employees/employees.service';
import { TasksService } from '../tasks/tasks.service';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private nextId = 1;
  projects = signal<Project[]>(this.loadProjects());

  constructor(
    private employeesService: EmployeesService,
    private tasksService: TasksService
  ) {}

  private saveProjects() {
    localStorage.setItem('projects', JSON.stringify(this.projects()));
  }

  private loadProjects(): Project[] {
    const stored = localStorage.getItem('projects');
    if (stored) {
      const parsed: Project[] = JSON.parse(stored);
      this.nextId = parsed.length > 0 ? parsed.reduce((max, p) => Math.max(max, p.id), 0) + 1 : 1;
      return parsed;
    }
    const defaults = [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Develop a comprehensive e-commerce solution with modern features and user-friendly interface',
        startDate: '2024-01-15',
        endDate: '2024-12-31'
      },
      {
        id: 2,
        name: 'Social Media Integration',
        description: 'Build tools for social media content management and analytics across multiple platforms',
        startDate: '2024-04-01',
        endDate: '2024-10-31'
      }
    ];
    this.nextId = 3;
    return defaults;
  }

  getProjects() {
    return this.projects();
  }

  addProject(project: Omit<Project, 'id'>) {
    const newProject = { id: this.nextId++, ...project };
    const updated = [...this.projects(), newProject];
    this.projects.set(updated);
    this.saveProjects();
    return newProject;
  }

  updateProject(id: number, updated: Partial<Project>) {
    const projects = this.projects();
    const index = projects.findIndex(p => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updated };
      this.projects.set([...projects]);
      this.saveProjects();
    }
  }  

  deleteProject(id: number) {
    const updated = this.projects().filter(p => p.id !== id);
    this.projects.set(updated);
    this.saveProjects();
    
    const tasksToRemove = this.tasksService.getTasks()
      .filter(task => task.projectId === id)
      .map(task => task.id);
    
    this.employeesService.removeProjectFromEmployees(id, tasksToRemove);
    
    this.tasksService.deleteTasksByProject(id);
  }
}
