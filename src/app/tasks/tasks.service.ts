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
    this.saveTasks();
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
    return [
    {
      id: 1,
      title: 'Implement user authentication',
      description: 'Create secure login and logout system with JWT tokens',
      status: 'completed',
      priority: 'high',
      assignedEmployeeId: 1,
      projectId: 1,
      dueDate: '2024-01-15',
      createdAt: '2024-01-01'
    },
    {
      id: 2,
      title: 'Design responsive UI components',
      description: 'Create modern and responsive user interface components',
      status: 'in-progress',
      priority: 'medium',
      assignedEmployeeId: 2,
      projectId: 1,
      dueDate: '2024-01-20',
      createdAt: '2024-01-02'
    },
    {
      id: 3,
      title: 'Setup payment gateway integration',
      description: 'Integrate secure payment processing for mobile banking',
      status: 'pending',
      priority: 'high',
      assignedEmployeeId: 3,
      projectId: 2,
      dueDate: '2024-02-15',
      createdAt: '2024-01-03'
    },
    {
      id: 4,
      title: 'Create user experience wireframes',
      description: 'Design intuitive user flows for banking app',
      status: 'completed',
      priority: 'medium',
      assignedEmployeeId: 2,
      projectId: 2,
      dueDate: '2024-01-25',
      createdAt: '2024-01-04'
    },
    {
      id: 5,
      title: 'Project planning and coordination',
      description: 'Manage project timeline and team coordination',
      status: 'in-progress',
      priority: 'high',
      assignedEmployeeId: 4,
      projectId: 1,
      dueDate: '2024-02-01',
      createdAt: '2024-01-05'
    },
    {
      id: 6,
      title: 'Implement API endpoints',
      description: 'Develop RESTful API for customer support system',
      status: 'pending',
      priority: 'medium',
      assignedEmployeeId: 3,
      projectId: 4,
      dueDate: '2024-03-15',
      createdAt: '2024-01-06'
    },
    {
      id: 7,
      title: 'Execute comprehensive testing',
      description: 'Run unit, integration and end-to-end tests for analytics dashboard',
      status: 'pending',
      priority: 'medium',
      assignedEmployeeId: 5,
      projectId: 3,
      dueDate: '2024-02-20',
      createdAt: '2024-01-07'
    },
    {
      id: 8,
      title: 'Deploy to production environment',
      description: 'Configure CI/CD pipeline and deploy inventory management system',
      status: 'pending',
      priority: 'high',
      assignedEmployeeId: 6,
      projectId: 5,
      dueDate: '2024-04-01',
      createdAt: '2024-01-08'
    }
  ];
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
}
