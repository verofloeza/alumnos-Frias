import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';

const routesLogin : Routes = [
  {
    path: '',
    component: LoginComponent,
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesLogin)
  ]
})
export class LoginRoutingModule { }
