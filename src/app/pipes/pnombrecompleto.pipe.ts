import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pnombrecompleto'
})
export class PnombrecompletoPipe implements PipeTransform {

  /** Se utiliza en la seccion MiPerfil, en el titulo y en el nombre de los especialistas.
   * En la historia clinica, para mostrar el nombre en la card.
   * para solicitar turno, para seleccionar al especialista
   * @returns 
   */
  transform(value: any, ...args: unknown[]): unknown {
    return value.nombre + " " + value.apellido;
  }

}
