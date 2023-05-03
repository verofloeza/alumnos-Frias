import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { LoginModule } from './pages/login/login.module';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    MatCardModule, 
    LoginModule,
    AuthRoutingModule,
    RouterModule
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
