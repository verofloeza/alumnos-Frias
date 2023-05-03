import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routesAuth : Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'
  },
  {
    path: 'login',  
    loadChildren : () => import('./pages/login/login.module').then((m)=> m.LoginModule)
    },
    {
      path: '**',
      redirectTo: 'login',
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesAuth)
  ]
})
export class AuthRoutingModule { }
