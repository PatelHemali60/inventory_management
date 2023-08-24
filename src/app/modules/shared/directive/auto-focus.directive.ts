import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private elem: ElementRef) {}

  ngAfterViewInit() {
    this.elem.nativeElement.focus();
  }
}
