import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    DirectivesModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RegisterRoutingModule
  ],
  exports: [
    RegisterComponent
  ]
})
export class RegisterModule { }
