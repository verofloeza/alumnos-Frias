import { Pipe, PipeTransform } from '@angular/core';

import { Alumno } from 'src/app/core/models';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: Alumno, ...args: unknown[]): unknown {
    return `${value.lastName}, ${value.firstName}`;
  }

}
