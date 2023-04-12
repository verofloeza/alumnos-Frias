import { AddStudentsComponent } from './add-students/add-students.component';
import { CommonModule } from '@angular/common';
import { DirectivesModule } from '../../directives/directives.module';
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
import { PipesModule } from '../../pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableStudentsComponent } from './table-students.component';
import { EditStudentsComponent } from './edit-students/edit-students.component';

@NgModule({
  declarations: [
    TableStudentsComponent,
    AddStudentsComponent,
    EditStudentsComponent
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
    MatSelectModule
  ],
  exports: [
    TableStudentsComponent
  ]
})
export class TableStudentsModule { }
