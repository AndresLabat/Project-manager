import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';
import { EmployeesService } from '../employees/employees.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksSignal = signal<Task[]>(this.loadTasks());
  private nextId = 9;

  constructor(private employeesService: EmployeesService) {
    this.syncEmployeeTaskAssignments();
  }

  private saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasksSignal()));
  }

  private loadTasks(): Task[] {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const parsed: Task[] = JSON.parse(stored);
      this.nextId = parsed.length > 0 ? parsed.reduce((max, task) => Math.max(max, task.id), 0) + 1 : 9;
      return parsed;
    }
    const defaults = [
      {
        id: 1,
        title: 'Frontend Development',
        description: 'Develop responsive user interface for the e-commerce platform with modern design patterns',
        status: 'in-progress' as const,
        priority: 'high' as const,
        assignedEmployeeId: 1,
        projectId: 1,
        dueDate: '2024-06-30',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        title: 'Analytics Dashboard',
        description: 'Create comprehensive analytics dashboard for social media metrics and performance insights',
        status: 'pending' as const,
        priority: 'medium' as const,
        assignedEmployeeId: 2,
        projectId: 2,
        dueDate: '2024-08-15',
        createdAt: '2024-04-01'
      }
    ];
    this.nextId = 3;
    return defaults;
  }


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
    this.saveTasks();
    
    if (newTask.assignedEmployeeId) {
      this.employeesService.assignToTask(newTask.assignedEmployeeId, newTask.id);
    }
  }

  updateTask(id: number, updatedTask: Partial<Task>): void {
    const currentTask = this.getTaskById(id);
    if (!currentTask) return;

    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
    this.saveTasks();

    const oldEmployeeId = currentTask.assignedEmployeeId;
    const newEmployeeId = updatedTask.assignedEmployeeId;

    if (oldEmployeeId !== newEmployeeId) {
      if (oldEmployeeId) {
        this.employeesService.unassignFromTask(oldEmployeeId, id);
      }
      if (newEmployeeId) {
        this.employeesService.assignToTask(newEmployeeId, id);
      }
    }
  }

  deleteTask(id: number): void {
    const taskToDelete = this.getTaskById(id);
    if (taskToDelete) {
      if (taskToDelete.assignedEmployeeId) {
        this.employeesService.unassignFromTask(taskToDelete.assignedEmployeeId, id);
      }
    }

    this.tasksSignal.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
    this.saveTasks();
  }

  updateTaskStatus(id: number, status: Task['status']): void {
    this.tasksSignal.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
    this.saveTasks();
  }

  syncEmployeeTaskAssignments(): void {
    const allTasks = this.getTasks();
    this.employeesService.updateEmployeeTaskAssignments(allTasks);
  }

  deleteTasksByProject(projectId: number): void {
    const tasksToDelete = this.getTasks().filter(task => task.projectId === projectId);
    
    tasksToDelete.forEach(task => {
      if (task.assignedEmployeeId) {
        this.employeesService.unassignFromTask(task.assignedEmployeeId, task.id);
      }
    });
    
    this.tasksSignal.update(tasks => 
      tasks.filter(task => task.projectId !== projectId)
    );
    this.saveTasks();
  }
}
