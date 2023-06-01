import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './courses.component';
import { DetailsCoursesComponent } from './pages/details-courses/details-courses.component';
import { NgModule } from '@angular/core';

const routesCourses : Routes = [
  {
    path: '',
    component: CoursesComponent
  },
  {
    path: ':id',
    component: DetailsCoursesComponent
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
