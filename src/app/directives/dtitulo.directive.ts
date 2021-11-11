import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDtitulo]'
})
export class DtituloDirective {

  @Input() tamanio = '';
  /** Se utiliza en la seccion MiPerfil, en el nombre
   * Y en el login, para remarcar que esta en el login
   * 
   */

  constructor(private elemento: ElementRef) {
    this.elemento = elemento;
    this.elemento.nativeElement.style.fontSize = '2em';
   }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.cambiarTamanio('3em');
    this.cambiarBorde('entra');
  }
  
  @HostListener('mouseleave') onMouseLeave(): void {
    this.cambiarTamanio('2em');
    this.cambiarBorde('sale');
  }

  private cambiarTamanio(tamanio:string): void {
    this.elemento.nativeElement.style.fontSize = tamanio;
  }

  private cambiarBorde(accion:string){
    accion == 'entra' ? this.elemento.nativeElement.style.borderBottom = '2px solid' : this.elemento.nativeElement.style.borderBottom = 'none';    
  }

}
