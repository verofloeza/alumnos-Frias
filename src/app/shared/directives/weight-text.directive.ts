import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appWeightText]'
})
export class WeightTextDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2 ) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-weight', `bolder`);
  }

}
