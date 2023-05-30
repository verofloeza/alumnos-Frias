import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';

const routeRegister : Routes = [
  {
    path: '',
    component: RegisterComponent,
    }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routeRegister)
  ]
})
export class RegisterRoutingModule { }
