import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pnombrecompleto'
})
export class PnombrecompletoPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.nombre + " " + value.apellido;
  }

}
