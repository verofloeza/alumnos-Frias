import { RouterModule, Routes } from '@angular/router';

import { CoursesComponent } from './dashboard/pages/courses/courses.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InscriptionsComponent } from './dashboard/pages/inscriptions/inscriptions.component';
import { NgModule } from '@angular/core';
import { StudentsComponent } from './dashboard/pages/students/students.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
      path: '',  
      children:[
          {
          path: '',
          component: StudentsComponent
          }
        ]
      },
      {
        path: 'cursos',  
        children:[
            {
              path: '',
              component: CoursesComponent
            }
          ]
        },
        {
          path: 'inscripciones',  
          children:[
              {
                path: '',
                component: InscriptionsComponent
              }
            ]
          },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
