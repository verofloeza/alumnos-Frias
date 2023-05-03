import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';

const routesStudents : Routes = [
  {
    path: '',
    component: StudentsComponent
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesStudents)
  ],
  exports: [
    RouterModule
  ]
})
export class StudentsRoutingModule { }
