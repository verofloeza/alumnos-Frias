import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './core/guards/login.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'',
    redirectTo:'dashboard',
    pathMatch:'full'
  },
  {
    path: 'auth',
    canActivate: [LoginGuard],
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m)=> m.AuthModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m)=> m.DashboardModule )
  },
  {
    path: '**',
    redirectTo: '/dashboard',
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
