import { CommonModule } from '@angular/common';
import { CoursesModule } from './pages/courses/courses.module';
import { DashboardComponent } from './dashboard.component';
import { InscriptionsModule } from './pages/inscriptions/inscriptions.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
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
    CoursesModule,
    InscriptionsModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
