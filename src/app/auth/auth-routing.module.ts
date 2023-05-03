import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routesAuth : Routes = [
  {
    path: '',  
    loadChildren : () => import('./pages/login/login.module').then((m)=> m.LoginModule)
    },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesAuth)
  ]
})
export class AuthRoutingModule { }
