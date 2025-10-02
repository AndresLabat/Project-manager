import { Injectable, signal } from '@angular/core';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private employeesSignal = signal<Employee[]>(this.loadEmployees());
  private nextId = 6;

  private saveEmployees() {
    localStorage.setItem('employees', JSON.stringify(this.employeesSignal()));
  }

  private loadEmployees(): Employee[] {
    const stored = localStorage.getItem('employees');
    if (stored) {
      const parsed: Employee[] = JSON.parse(stored);
      this.nextId = parsed.reduce((max, emp) => Math.max(max, emp.id), 0) + 1;
      return parsed;
    }
    return [
    {
      id: 1,
      fullName: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Frontend Developer',
      assignedProjects: [1],
      assignedTasks: []
    },
    {
      id: 2,
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'UX/UI Designer',
      assignedProjects: [1, 2],
      assignedTasks: []
    },
    {
      id: 3,
      fullName: 'Mike Wilson',
      email: 'mike.wilson@company.com',
      role: 'Backend Developer',
      assignedProjects: [2],
      assignedTasks: []
    },
    {
      id: 4,
      fullName: 'Emma Davis',
      email: 'emma.davis@company.com',
      role: 'Project Manager',
      assignedProjects: [1, 2, 3],
      assignedTasks: []
    },
    {
      id: 5,
      fullName: 'David Brown',
      email: 'david.brown@company.com',
      role: 'QA Tester',
      assignedProjects: [3],
      assignedTasks: []
    }
  ];
  }

  constructor() {
    this.saveEmployees();
  }

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
    this.saveEmployees();
  }

  updateEmployee(id: number, updatedEmployee: Omit<Employee, 'id'>): void {
    this.employeesSignal.update(employees =>
      employees.map(emp =>
        emp.id === id ? { ...updatedEmployee, id } : emp
      )
    );
    this.saveEmployees();
  }

  deleteEmployee(id: number): void {
    this.employeesSignal.update(employees =>
      employees.filter(emp => emp.id !== id)
    );
    this.saveEmployees();
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
    this.saveEmployees();
  }

  assignToTask(employeeId: number, taskId: number): void {
    this.employeesSignal.update(employees =>
      employees.map(emp => {
        if (emp.id === employeeId && !emp.assignedTasks.includes(taskId)) {
          return {
            ...emp,
            assignedTasks: [...emp.assignedTasks, taskId]
          };
        }
        return emp;
      })
    );
    this.saveEmployees();
  }

  unassignFromTask(employeeId: number, taskId: number): void {
    this.employeesSignal.update(employees =>
      employees.map(emp => {
        if (emp.id === employeeId) {
          return {
            ...emp,
            assignedTasks: emp.assignedTasks.filter(id => id !== taskId)
          };
        }
        return emp;
      })
    );
    this.saveEmployees();
  }

  updateEmployeeTaskAssignments(allTasks: any[]): void {
    this.employeesSignal.update(employees =>
      employees.map(emp => ({
        ...emp,
        assignedTasks: allTasks
          .filter((task: any) => task.assignedEmployeeId === emp.id)
          .map((task: any) => task.id)
      }))
    );
    this.saveEmployees();
  }
}
