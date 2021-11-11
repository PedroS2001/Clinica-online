import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ppuntosdni'
})
export class PpuntosdniPipe implements PipeTransform {

  /** Con el perfil administrador se utiliza en la seccion usuarios, en las tablas de administrador y especialistas
   * 
   */
  transform(value: any, ...args: unknown[]): unknown {

    let dniString = value.toString();
    let millones = dniString.slice(0,2) ;
    let miles = dniString.slice(2,5);
    let cientos = dniString.slice(5);
    // console.info(millones+'.'+miles+'.'+cientos);

    return millones + '.' + miles + '.' + cientos;
  }

}
