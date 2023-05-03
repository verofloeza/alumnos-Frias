import { AuthService, LoginFormValue } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);
  loginForm = new FormGroup({
    email: this.emailControl,
    pass: this.passwordControl,
  });

  constructor(
    private authService: AuthService
  ){}
  
  onSubmit(): void {
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    } else {
      this.authService.login(this.loginForm.value as LoginFormValue)
    }
  }
}
