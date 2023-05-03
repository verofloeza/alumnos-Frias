import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    LoginRoutingModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
