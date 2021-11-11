import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pcapitalze'
})
export class PcapitalzePipe implements PipeTransform {

  /** Se utiliza en todas las tablas que muestran informacion de los usuarios (administrador,especialistas y pacientes
   * y en la seccion MisTurnos de los tres perfiles)
   * 
   * @param value 
   * @param args 
   * @returns 
   */
  transform(value: string, ...args: unknown[]): unknown {
    return value[0].toUpperCase() + value.slice(1);
  }

}
