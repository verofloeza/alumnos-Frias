import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Inscripciones } from '../models/inscripciones.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {

  inscripciones: Inscripciones[] = []

  private inscripciones$ = new BehaviorSubject<Inscripciones[]>(this.inscripciones)
  
  constructor(
    private httpClient: HttpClient
  ) { }

  get inscripcion(): Observable<Inscripciones[] | any>{
    this.httpClient.get<Inscripciones[]>('http://localhost:3000/inscription')
    .subscribe({
      next: (inscription) =>{
        this.inscripciones$.next(inscription)
      }
    })
    return this.inscripciones$.asObservable();
  }

  deleteInscripcion(id: number): Observable<Inscripciones[] | any> {
    this.httpClient.delete<Inscripciones[]>(`http://localhost:3000/inscription/${id}`)
          .subscribe( (data) =>{
            this.inscripcion       
          })
    return this.inscripciones$.asObservable()
  }

  getInscripcionesByAlumnoId(alumnoId: number): Observable<Inscripciones[]> {
    return this.httpClient.get<Inscripciones[]>(`http://localhost:3000/inscription?student=${alumnoId}`);
  }
}
