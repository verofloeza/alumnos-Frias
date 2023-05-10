import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  private authRole$ = new BehaviorSubject<Usuario | null>(null);

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

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
      return this.httpClient.get<Usuario[]>(
      `http://localhost:3000/user?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            this.authUser$.next(usuarioAutenticado);
          }
          return !!usuarioAutenticado;
        }),
        catchError((err) => {
          alert('Error al verificar el token');
          return throwError(() => err);
        })
      );
    }

    getRole(): Observable<boolean> {
      const token = localStorage.getItem('token');
        return this.httpClient.get<Usuario[]>(
        `http://localhost:3000/user?token=${token}`,
        {
          headers: new HttpHeaders({
            'Authorization': token || '',
          }),
        }
      )
        .pipe(
          map((usuarios) => {
            const usuarioAutenticado = usuarios[0];
            if (usuarioAutenticado.role === 'admin') {
              this.authRole$.next(usuarioAutenticado);
              return !!usuarioAutenticado;
            }else{
              return !usuarioAutenticado;
            }
          }),
          catchError((err) => {
            alert('Error al verificar el token');
            return throwError(() => err);
          })
        );
      }
  
}
