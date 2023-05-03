import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routesDash: Routes = [
  {
    path: 'estudiantes',  
    loadChildren: () => import('./pages/students/students.module').then((m)=> m.StudentsModule )
  },
  {
    path: 'cursos',  
    loadChildren: () => import('./pages/courses/courses.module').then((m)=> m.CoursesModule )
  },
  {
    path: 'inscripciones',  
    loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((m)=> m.InscriptionsModule )
  },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesDash)
  ]
})
export class DashboardRoutingModule { }