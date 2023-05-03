import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from './core/guards/login.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [LoginGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m)=> m.DashboardModule )
  },{
    path: 'auth',
    canActivate: [LoginGuard],
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m)=> m.AuthModule)
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
