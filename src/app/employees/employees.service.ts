import { Injectable, signal } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employeesSignal = signal<Employee[]>([
    {
      id: 1,
      fullName: 'Juan Pérez',
      email: 'juan.perez@company.com',
      role: 'Desarrollador Frontend',
      assignedProjects: [1],
      assignedTasks: []
    },
    {
      id: 2,
      fullName: 'María García',
      email: 'maria.garcia@company.com',
      role: 'Diseñadora UX/UI',
      assignedProjects: [1, 2],
      assignedTasks: []
    },
    {
      id: 3,
      fullName: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@company.com',
      role: 'Desarrollador Backend',
      assignedProjects: [2],
      assignedTasks: []
    },
    {
      id: 4,
      fullName: 'Ana Martínez',
      email: 'ana.martinez@company.com',
      role: 'Project Manager',
      assignedProjects: [1, 2, 3],
      assignedTasks: []
    },
    {
      id: 5,
      fullName: 'Luis Sánchez',
      email: 'luis.sanchez@company.com',
      role: 'QA Tester',
      assignedProjects: [3],
      assignedTasks: []
    }
  ]);

  private nextId = 6;

  constructor() {}

  getEmployees(): Employee[] {
    return this.employeesSignal();
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employeesSignal().find(emp => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): void {
    const newEmployee: Employee = {
      ...employee,
      id: this.nextId++
    };
    this.employeesSignal.update(employees => [...employees, newEmployee]);
  }

  updateEmployee(id: number, updatedEmployee: Omit<Employee, 'id'>): void {
    this.employeesSignal.update(employees =>
      employees.map(emp =>
        emp.id === id ? { ...updatedEmployee, id } : emp
      )
    );
  }

  deleteEmployee(id: number): void {
    this.employeesSignal.update(employees =>
      employees.filter(emp => emp.id !== id)
    );
  }

  getEmployeesByProject(projectId: number): Employee[] {
    return this.employeesSignal().filter(emp =>
      emp.assignedProjects.includes(projectId)
    );
  }

  assignToProject(employeeId: number, projectId: number): void {
    this.employeesSignal.update(employees =>
      employees.map(emp => {
        if (emp.id === employeeId && !emp.assignedProjects.includes(projectId)) {
          return {
            ...emp,
            assignedProjects: [...emp.assignedProjects, projectId]
          };
        }
        return emp;
      })
    );
  }

  unassignFromProject(employeeId: number, projectId: number): void {
    this.employeesSignal.update(employees =>
      employees.map(emp => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            assignedProjects: emp.assignedProjects.filter(id => id !== projectId)
          };
        }
        return emp;
      })
    );
  }
}

