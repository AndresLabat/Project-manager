import { Injectable, signal } from '@angular/core';
import { Project } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private nextId = 4;
  projects = signal<Project[]>(this.loadProjects());

  private saveProjects() {
    localStorage.setItem('projects', JSON.stringify(this.projects()));
  }

  private loadProjects(): Project[] {
    const stored = localStorage.getItem('projects');
    if (stored) {
      const parsed: Project[] = JSON.parse(stored);
      this.nextId = parsed.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      return parsed;
    }
    return [
      {
        id: 1,
        name: 'E-commerce Platform',
        description: 'Build a modern e-commerce platform with React and Node.js',
        startDate: '2024-01-01',
        endDate: '2024-06-30'
      },
      {
        id: 2,
        name: 'Mobile Banking App',
        description: 'Develop a secure mobile banking application for iOS and Android',
        startDate: '2024-02-01',
        endDate: '2024-08-31'
      },
      {
        id: 3,
        name: 'Data Analytics Dashboard',
        description: 'Create an interactive dashboard for business intelligence and reporting',
        startDate: '2024-01-15',
        endDate: '2024-04-15'
      }
    ];
  }

  getProjects() {
    return this.projects();
  }

  addProject(project: Omit<Project, 'id'>) {
    const updated = [...this.projects(), { id: this.nextId++, ...project }];
    this.projects.set(updated);
    this.saveProjects();
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
  }
}
