import { CommonModule } from '@angular/common';
import { DirectivesModule } from './directives/directives.module';
import { NgModule } from '@angular/core';
import { PipesModule } from './pipes/pipes.module';
import { TableStudentsModule } from './components/table-students/table-students.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    TableStudentsModule,
    PipesModule,
    DirectivesModule
  ]
})
export class SharedModule { }
