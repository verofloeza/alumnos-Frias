import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { NgModule } from '@angular/core';

const routesCourses : Routes = [
  {
    path: '',
    component: CoursesComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesCourses)
  ],
  exports: [
    RouterModule
  ]
})
export class CoursesRoutingModule { }
