import { BehaviorSubject, Observable } from 'rxjs';

import { Curso } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  cursos: Curso[] = [];
  
  private cursos$ = new BehaviorSubject<Curso[]>(this.cursos)

  constructor(
    private httpClient: HttpClient
  ) { }

  get curso(): Observable<Curso[] | any>{
    this.httpClient.get<Curso[]>('http://localhost:3000/courses')
    .subscribe({
      next: (course) =>{
        this.cursos$.next(course)
      }
    })
    return this.cursos$.asObservable();
  }

  deleteCurso(id: number): Observable<Curso[] | any> {
    this.httpClient.delete<Curso[]>(`http://localhost:3000/courses/${id}`)
          .subscribe( (data) =>{
            this.curso       
          })
    return this.cursos$.asObservable()
  }
}
