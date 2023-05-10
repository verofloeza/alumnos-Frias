import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';

const routesUser : Routes = [
  {
    path: '',
    component: UsersComponent
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesUser)
  ]
})
export class UsersRoutingModule { }
