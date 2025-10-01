import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent {
  @Input() route: string = '/projects';
  @Input() label: string = 'Back to Projects';

  constructor(private router: Router) {}

  goBack(): void {
    this.router.navigate([this.route]);
  }
}

