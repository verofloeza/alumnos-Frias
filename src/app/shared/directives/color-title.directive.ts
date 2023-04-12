import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appColorTitle]'
})
export class ColorTitleDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2 ) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', `coral`);
  }
}
