import { Usuario, UsuarioCreate } from '../models/usuario.model';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  constructor(
    private httpClient: HttpClient
  ) { }

  getUsuarios() : Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>('http://localhost:3000/user')
  }
  
  deleteUser(id: number): Observable<Usuario[] | any> {
    return  this.httpClient.delete<Usuario[]>(`http://localhost:3000/user/${id}`)
  }

  createUsers(data: UsuarioCreate): Observable<Usuario>{
    return this.httpClient.post<Usuario>(`http://localhost:3000/user`, data)
  }

  editeUsers(data: Usuario, id: number): Observable<Usuario>{
    return this.httpClient.put<Usuario>(`http://localhost:3000/user/${id}`, data)
  }
  
}