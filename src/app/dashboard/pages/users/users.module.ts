import { AbmUsersComponent } from './abm-users/abm-users.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users.component';
import { UsersEffects } from 'src/app/store/users/users.effects';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    AbmUsersComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    PipesModule,
    DirectivesModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    UsersRoutingModule, 
    MatIconModule, 
    EffectsModule.forFeature([UsersEffects])
  ],
  exports: [
    UsersComponent
  ]
})
export class UsersModule { }
