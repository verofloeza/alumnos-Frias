import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { CommonModule } from '@angular/common';
import { DetailsStudentsComponent } from './pages/details-students/details-students.component';
import { DirectivesModule } from '../../../shared/directives/directives.module';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsComponent } from './students.component';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  declarations: [
    StudentsComponent,
    AbmStudentsComponent,
    DetailsStudentsComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    PipesModule,
    DirectivesModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    StudentsRoutingModule
  ],
  exports: [
    StudentsComponent
  ]
})
export class StudentsModule { }
