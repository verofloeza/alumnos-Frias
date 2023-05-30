import { AuthService, RegisterFormValue } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  firstNameControl = new FormControl('', [Validators.required] );
  lastNameControl = new FormControl('', [Validators.required] );
  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    pass: this.passwordControl,
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  
  onSubmit(): void {
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.register(this.loginForm.value as RegisterFormValue)
    }
  }

  redireccionar(): void {
    this.router.navigate(['/auth/login']);
  }
}
