import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormInputComponent } from '../../shared/form-input/form-input.component';
@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, FormInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute 
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/projects']);
    }
  }

  onLogin() {
    if (this.form.invalid) return;

    const username = this.form.value.username ?? '';
    const password = this.form.value.password ?? '';

    if (this.authService.login(username, password)) {
      const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '/projects';
      this.router.navigate([redirectTo]);
    } else {
      this.form.setErrors({ invalidLogin: true });
    }
  }

  continueWithoutLogin() {
    this.router.navigate(['/projects']);
  }

}
