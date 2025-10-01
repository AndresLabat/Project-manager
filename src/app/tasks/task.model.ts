export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedEmployeeId: number | null;
  projectId: number;
  dueDate: string;
  createdAt: string;
}
