import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDresaltar]'
})
export class DresaltarDirective {

  @Input() appAppresaltar = '';

  constructor(private elemento: ElementRef) {
    this.elemento = elemento;
    this.elemento.nativeElement.style.backgroundColor = "";
   }

  @HostListener('mouseenter') onMouseEnter() {
    this.cambiarColor(this.appAppresaltar);
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.cambiarColor('white');
  }

  private cambiarColor(color:string)
  {
  this.elemento.nativeElement.style.backgroundColor = color;
  }

}
