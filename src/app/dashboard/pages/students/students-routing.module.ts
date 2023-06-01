import { RouterModule, Routes } from '@angular/router';

import { DetailsStudentsComponent } from './pages/details-students/details-students.component';
import { NgModule } from '@angular/core';
import { StudentsComponent } from './students.component';

const routesStudents : Routes = [
  {
    path: '',
    component: StudentsComponent
  },
  {
    path: 'detalle/:id',
    component: DetailsStudentsComponent
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
