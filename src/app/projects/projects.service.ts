import { Injectable, signal } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

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
      this.nextId = parsed.reduce((max, p) => Math.max(max, p.id), 0) + 1;
      return parsed;
    }
    return [];
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

