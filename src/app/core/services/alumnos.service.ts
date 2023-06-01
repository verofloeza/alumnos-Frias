import { BehaviorSubject, Observable, map } from 'rxjs';

import { Alumno } from '../models/alumnos.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumno: Alumno[]  = [];

  private alumno$ = new BehaviorSubject<Alumno[]>(this.alumno);

  constructor(
    private httpClient: HttpClient
  ) { }

  getAlumnos() : Observable<Alumno[]> {
    this.httpClient.get<Alumno[]>('http://localhost:3000/students')
    .subscribe({
      next: (student) =>{
        this.alumno$.next(student)
      }
    })
    return this.alumno$.asObservable();
  }
  
  deleteAlumno(id: number): Observable<Alumno[] | any> {
    this.httpClient.delete<Alumno[]>(`http://localhost:3000/students/${id}`)
          .subscribe( (data) =>{
            this.getAlumnos()
          })
    return this.alumno$.asObservable()
  }
}
