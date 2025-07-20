import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.addClass(this.el.nativeElement, 'transform');
    this.renderer.addClass(this.el.nativeElement, 'scale-105');
    this.renderer.addClass(this.el.nativeElement, 'transition');
    this.renderer.addClass(this.el.nativeElement, 'duration-300');
    this.renderer.addClass(this.el.nativeElement, 'ease-in-out');
    this.renderer.addClass(this.el.nativeElement, 'shadow-lg');
  }
  
  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.removeClass(this.el.nativeElement, 'transform');
    this.renderer.removeClass(this.el.nativeElement, 'scale-105');
    this.renderer.removeClass(this.el.nativeElement, 'transition');
    this.renderer.removeClass(this.el.nativeElement, 'duration-300');
    this.renderer.removeClass(this.el.nativeElement, 'ease-in-out');
    this.renderer.removeClass(this.el.nativeElement, 'shadow-lg');
  }
}
