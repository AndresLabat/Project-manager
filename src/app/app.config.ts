import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectFormComponent } from './projects/project-form/project-form.component';
import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ProjectDetailComponent } from './projects/project-detail/project-detail.component';
import { EmployeesListComponent } from './employees/employees-list/employees-list.component';
import { EmployeeDetailComponent } from './employees/employee-detail/employee-detail.component';
import { EmployeeFormComponent } from './employees/employee-form/employee-form.component';
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
          { path: ':id/edit', component: ProjectEditComponent },
          { path: ':id', component: ProjectDetailComponent }
        ]
      },
      { path: 'employees',
        canActivate: [AuthGuard],
        children: [
          { path: '', component: EmployeesListComponent },
          { path: 'new', component: EmployeeFormComponent },
          { path: ':id', component: EmployeeDetailComponent }
        ]
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
      { path: '**', redirectTo: 'projects' }
    ]),
    provideHttpClient()
  ]
};
