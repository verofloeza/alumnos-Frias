import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usuario: Usuario[]  = [];

  private usuario$ = new BehaviorSubject<Usuario[]>(this.usuario);

  constructor(
    private httpClient: HttpClient
  ) { }

  getUsuarios() : Observable<Usuario[]> {
    this.httpClient.get<Usuario[]>('http://localhost:3000/user')
    .subscribe({
      next: (user) =>{
        this.usuario$.next(user)
      }
    })
    return this.usuario$.asObservable();
  }
  
  deleteUser(id: number): Observable<Usuario[] | any> {
    this.httpClient.delete<Usuario[]>(`http://localhost:3000/user/${id}`)
          .subscribe( (data) =>{
            this.getUsuarios()
          })
    return this.usuario$.asObservable()
  }

  
}
