import { BehaviorSubject, Observable, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { Inscripciones } from '../models/inscripciones.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  inscripciones: Inscripciones[] = []

  private inscripciones$ = new BehaviorSubject<Inscripciones[]>(this.inscripciones)
  
  constructor() { }

  get inscripcion(): Observable<Inscripciones[] | any>{
    return this.inscripciones$.asObservable();
  }

  deleteInscripcion(id: number): Observable<Inscripciones[] | any> {

    return this.inscripciones$.asObservable()
      .pipe(
        map((inscripcion) => inscripcion.filter(i => i.id != id))
      )
  }
}
