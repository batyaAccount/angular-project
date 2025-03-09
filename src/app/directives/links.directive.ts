import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone:true,
  selector: '[appLinks]'
})
export class LinksDirective {

  @Input() appLinks?: string;

  constructor(private el: ElementRef) {
    this.setColor('black');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setColor(this.appLinks || 'yellow');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setColor('black');
  }

  private setColor(color: string) {
    this.el.nativeElement.style.color = color;
  }
}

