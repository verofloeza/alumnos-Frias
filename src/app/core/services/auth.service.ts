import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

export interface LoginFormValue {
  email: string;
  pass: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  userAuth(): Observable<Usuario | null>{
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
      this.httpClient.get<Usuario[]>(
        'http://localhost:3000/user', 
        {
          params:{
           ...formValue 
          }
        }
        ).subscribe({
          next: (usuarios) => {
            const usuarioAutenticado = usuarios[0];
            if (usuarioAutenticado) {
              localStorage.removeItem('token');
              localStorage.setItem('token', usuarioAutenticado.token)
              this.authUser$.next(usuarioAutenticado);
              this.router.navigate(['dashboard']);
            } else {
              alert('¡Usuario y contraseña incorrectos!')
            }
          }
        })
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }
  
}
