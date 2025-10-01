import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksSignal = signal<Task[]>([
    {
      id: 1,
      title: 'Implementar autenticación',
      description: 'Crear sistema de login y logout para la aplicación',
      status: 'completed',
      priority: 'high',
      assignedEmployeeId: 1,
      projectId: 1,
      dueDate: '2024-01-15',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      title: 'Diseñar interfaz de usuario',
      description: 'Crear mockups y prototipos de la interfaz',
      status: 'in-progress',
      priority: 'medium',
      assignedEmployeeId: 2,
      projectId: 1,
      dueDate: '2024-01-20',
      createdAt: '2024-01-02'
    },
    {
      id: 3,
      title: 'Configurar base de datos',
      description: 'Configurar y optimizar la base de datos del proyecto',
      status: 'pending',
      priority: 'high',
      assignedEmployeeId: 3,
      projectId: 2,
      dueDate: '2024-01-25',
      createdAt: '2024-01-03'
    },
    {
      id: 4,
      title: 'Escribir documentación',
      description: 'Crear documentación técnica del proyecto',
      status: 'pending',
      priority: 'low',
      assignedEmployeeId: 4,
      projectId: 2,
      dueDate: '2024-01-30',
      createdAt: '2024-01-04'
    },
    {
      id: 5,
      title: 'Realizar pruebas',
      description: 'Ejecutar pruebas unitarias y de integración',
      status: 'pending',
      priority: 'medium',
      assignedEmployeeId: 5,
      projectId: 3,
      dueDate: '2024-02-01',
      createdAt: '2024-01-05'
    }
  ]);

  private nextId = 6;

  constructor() {}

  getTasks(): Task[] {
    return this.tasksSignal();
  }

  getTaskById(id: number): Task | undefined {
    return this.tasksSignal().find(task => task.id === id);
  }

  getTasksByProject(projectId: number): Task[] {
    return this.tasksSignal().filter(task => task.projectId === projectId);
  }

  getTasksByEmployee(employeeId: number): Task[] {
    return this.tasksSignal().filter(task => task.assignedEmployeeId === employeeId);
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask: Task = {
      ...task,
      id: this.nextId++
    };
    this.tasksSignal.update(tasks => [...tasks, newTask]);
  }

  updateTask(id: number, updatedTask: Partial<Task>): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  }

  deleteTask(id: number): void {
    this.tasksSignal.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }

  updateTaskStatus(id: number, status: Task['status']): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  }
}
