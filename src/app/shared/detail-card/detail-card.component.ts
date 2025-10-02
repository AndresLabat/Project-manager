import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-detail-card',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, ButtonComponent],
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss']
})
export class DetailCardComponent {
  @Input() title: string = '';
  @Input() backRoute: string = '';
  @Input() backLabel: string = '';
  @Input() showActions: boolean = true;
  @Input() editLabel: string = 'Edit';
  @Input() deleteLabel: string = 'Delete';
  @Output() editClick = new EventEmitter<void>();
  @Output() deleteClick = new EventEmitter<void>();

  onEdit() {
    this.editClick.emit();
  }

  onDelete() {
    this.deleteClick.emit();
  }
}
