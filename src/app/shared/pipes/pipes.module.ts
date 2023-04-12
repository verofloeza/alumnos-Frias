import { CommonModule } from '@angular/common';
import { ControlErrorMessagesPipe } from './control-error-messages.pipe';
import { FullNamePipe } from './full-name.pipe';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    FullNamePipe,
    ControlErrorMessagesPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FullNamePipe,
    ControlErrorMessagesPipe
  ]
})
export class PipesModule { }
