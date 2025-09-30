import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  title = signal('Project Manager');

  constructor(private authService: AuthService, private router: Router, private titleService: Title) {
    this.titleService.setTitle(this.title());
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
