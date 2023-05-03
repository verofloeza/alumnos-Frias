import { RouterModule, Routes } from '@angular/router';

import { InscriptionsComponent } from './inscriptions.component';
import { NgModule } from '@angular/core';

const routesInscriptions : Routes = [
  {
    path: '',
    component: InscriptionsComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routesInscriptions)
  ]
})
export class InscriptionsRoutingModule { }
