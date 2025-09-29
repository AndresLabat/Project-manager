import { Injectable } from '@angular/core';

export interface Project {
  id: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private projects: Project[] = [];
  private nextId = 1;

  constructor() {}

  getProjects(): Project[] {
    return this.projects;
  }

  getProject(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  addProject(project: Omit<Project, 'id'>): void {
    this.projects.push({ id: this.nextId++, ...project });
  }

  updateProject(id: number, updated: Partial<Project>): void {
    const project = this.getProject(id);
    if (project) Object.assign(project, updated);
  }

  deleteProject(id: number): void {
    this.projects = this.projects.filter(p => p.id !== id);
  }
}
