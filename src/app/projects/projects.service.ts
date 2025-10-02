import { Injectable, signal } from '@angular/core';
import { Project } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private nextId = 1;
  projects = signal<Project[]>(this.loadProjects());

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
      },
      {
        id: 4,
        name: 'Customer Support System',
        description: 'Implement a comprehensive customer support platform with ticketing and chat features',
        startDate: '2024-03-01',
        endDate: '2024-09-30'
      },
      {
        id: 5,
        name: 'Inventory Management',
        description: 'Develop a real-time inventory tracking system with automated reordering capabilities',
        startDate: '2024-02-15',
        endDate: '2024-07-15'
      },
      {
        id: 6,
        name: 'Social Media Integration',
        description: 'Build tools for social media content management and analytics across multiple platforms',
        startDate: '2024-04-01',
        endDate: '2024-10-31'
      }
    ];
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
  }
}
