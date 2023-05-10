import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../core/guards/admin.guard';
import { NgModule } from '@angular/core';

const routesDash: Routes = [
  {
    path: '',
    redirectTo: 'estudiantes',
    pathMatch:'full'
  },
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
  {
    path: 'usuarios', 
    loadChildren: () => import('./pages/users/users.module').then((m)=> m.UsersModule ), 
    canActivate: [AdminGuard]
    
  },
  {
    path: '**',
    redirectTo: 'estudiantes',
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesDash)
  ], 
})
export class DashboardRoutingModule { }
