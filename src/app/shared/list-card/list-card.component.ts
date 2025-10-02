import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-list-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() subtitle: string = '';
  @Input() showActions: boolean = true;
  @Input() showViewButton: boolean = true;
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;
  @Input() viewButtonText: string = 'View';
  @Input() editButtonText: string = 'Edit';
  @Input() deleteButtonText: string = 'Delete';

  @Output() viewClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();

  onViewClick(): void {
    this.viewClick.emit();
  }

  onEditClick(): void {
    this.editClick.emit();
  }

  onDeleteClick(): void {
    this.deleteClick.emit();
  }
}
