import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { AuthGuard } from './auth/auth.guard';

export const appConfig = {
  providers: [
    provideRouter([
      { path: 'login', component: LoginComponent },
      { path: 'projects', 
        canActivate: [AuthGuard],
        children: [
          { path: '', component: ProjectsListComponent },
          { path: 'new', component: ProjectFormComponent },
          { path: ':id/edit', component: ProjectEditComponent }
        ]
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: '**', redirectTo: 'projects' }
    ]),
    provideHttpClient()
  ]
};
