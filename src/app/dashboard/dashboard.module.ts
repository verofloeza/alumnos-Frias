import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { InscriptionsModule } from './pages/inscriptions/inscriptions.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { PipesModule } from '../shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { StudentsModule } from './pages/students/students.module';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    StudentsModule,
    RouterModule,
    InscriptionsModule,
    RouterModule,
    DashboardRoutingModule,
    DirectivesModule,
    PipesModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
