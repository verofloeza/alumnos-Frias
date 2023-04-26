import { BehaviorSubject, Observable, map } from 'rxjs';

import { Curso } from '../models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: Curso[] = [
    new Curso(1, 'Curso Angular', new Date('2023-04-25'), new Date('2023-06-25')),
    new Curso(2, 'Curso Vue', new Date('2023-04-25'), new Date('2023-06-25')),
    new Curso(3, 'Curso React', new Date('2023-04-25'), new Date('2023-06-25'))
  ]
  
  private cursos$ = new BehaviorSubject<Curso[]>(this.cursos)

  constructor() { }

  get curso(): Observable<Curso[] | any>{
    return this.cursos$.asObservable();
  }

  deleteCurso(id: number): Observable<Curso[] | any> {
    return this.cursos$.asObservable()
      .pipe(
        map((curso) => curso.filter(i => i.id != id))
      )
  }
}
