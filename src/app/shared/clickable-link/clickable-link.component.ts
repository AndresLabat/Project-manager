import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clickable-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clickable-link.component.html',
  styleUrls: ['./clickable-link.component.scss']
})
export class ClickableLinkComponent {
  @Input() text: string = '';
  @Input() id: number | null = null;
  @Output() linkClick = new EventEmitter<number>();

  onLinkClick() {
    if (this.id !== null) {
      this.linkClick.emit(this.id);
    }
  }
}
