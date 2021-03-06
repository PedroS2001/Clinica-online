import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appMarco]'
})
export class MarcoDirective {

  @Input() marco = '';
  /** Se utiliza para darle un marco a las imagenes
   * se utiliza en MiPerfil, en el login y en la seccionPacientes de especialista
   * 
   */

  constructor(private elemento: ElementRef) {
    this.elemento = elemento;
   }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.cambiarMarco('3px solid #FFD700');
  }
  
  @HostListener('mouseleave') onMouseLeave(): void {
    this.cambiarMarco('none');
  }

  private cambiarMarco(marco:string): void {
    this.elemento.nativeElement.style.border = marco;
  }

}
