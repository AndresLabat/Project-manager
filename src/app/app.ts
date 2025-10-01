import { Component, signal, computed } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  title = signal('Project Manager');
  currentRoute = signal('');
  projectsDropdownOpen = signal(true);
  employeesDropdownOpen = signal(true);
  tasksDropdownOpen = signal(true);

  constructor(
    public authService: AuthService,
    public router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle(this.title());
    
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
      });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActiveRoute(route: string): boolean {
    const currentRoute = this.currentRoute();
    if (route === '/') {
      return currentRoute === '/';
    }
    return currentRoute.startsWith(route);
  }

  isActiveSubRoute(route: string): boolean {
    const currentRoute = this.currentRoute();
    return currentRoute === route;
  }

  toggleProjectsDropdown() {
    this.projectsDropdownOpen.set(!this.projectsDropdownOpen());
  }

  toggleEmployeesDropdown() {
    this.employeesDropdownOpen.set(!this.employeesDropdownOpen());
  }

  toggleTasksDropdown() {
    this.tasksDropdownOpen.set(!this.tasksDropdownOpen());
  }
}
