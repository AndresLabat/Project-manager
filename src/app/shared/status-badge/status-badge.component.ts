import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.scss']
})
export class StatusBadgeComponent {
  @Input() type: 'status' | 'priority' = 'status';
  @Input() value: string = '';
  @Input() showLabel: boolean = true;

  get cssClass(): string {
    if (this.type === 'status') {
      return this.getStatusClass(this.value);
    } else {
      return this.getPriorityClass(this.value);
    }
  }

  get label(): string {
    return this.type === 'status' ? 'Status:' : 'Priority:';
  }

  private getStatusClass(status: string): string {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  private getPriorityClass(priority: string): string {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  }
}
