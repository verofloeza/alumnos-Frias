import { BehaviorSubject, Observable, map } from 'rxjs';

import { Alumno } from '../models/alumnos.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumno: Alumno[]  = [
    new Alumno(1, 'Veronica', 'Frias', 'vero@gmail.com', 8,  new Date('1986-12-15'), 'F'),
    new Alumno(2, 'Marcos', 'Lopez', 'marcos@gmail.com', 15,  new Date('1979-4-2'), 'M'),
  ]
  ultAlumno: Alumno[] = [];

  private alumno$ = new BehaviorSubject<Alumno[]>(this.alumno);

  constructor() { }

  getAlumnos() : Observable<Alumno[]> {
    return this.alumno$.asObservable();
  }
  
  deleteAlumno(id: number): Observable<Alumno[] | any> {
    return this.alumno$.asObservable()
      .pipe(
        map((alumnos) => alumnos.find(i => i.id != id))
      )
  }
}
