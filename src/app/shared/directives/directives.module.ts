import { CapitalizeDirective } from './capitalize.directive';
import { ColorTitleDirective } from './color-title.directive';
import { CommonModule } from '@angular/common';
import { FontSizeDirective } from './font-size.directive';
import { NgModule } from '@angular/core';
import { WeightTextDirective } from './weight-text.directive';

@NgModule({
  declarations: [
    FontSizeDirective,
    ColorTitleDirective,
    WeightTextDirective,
    CapitalizeDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FontSizeDirective,
    ColorTitleDirective,
    WeightTextDirective,
    CapitalizeDirective
  ]
})
export class DirectivesModule { }
