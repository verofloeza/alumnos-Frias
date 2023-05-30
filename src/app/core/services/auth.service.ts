import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

export interface LoginFormValue {
  email: string;
  pass: string;
}

export interface RegisterFormValue {
  id: Number;
  name: string;
  firstName: string;
  email: string;
  pass: string;
  token: string;
  role: string;
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
  register(formValue: RegisterFormValue): void {
    formValue = {
      ...formValue,
      token: Math.random().toString(36).substr(2),
      role: 'cliente'
    };
  
    this.httpClient.post<Usuario>('http://localhost:3000/user', formValue)
      .subscribe(
        (usuario) => {
          console.log(usuario);
          if (usuario) {
            localStorage.removeItem('token');
            localStorage.setItem('token', usuario.token);
            this.authUser$.next(usuario);
            this.router.navigate(['dashboard']);
          } else {
            alert('¡No se pudo realizar el registro!');
          }
        },
        (error) => {
          console.error('Error al realizar la solicitud:', error);
          alert('¡No se pudo realizar el registro!');
        }
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth', 'login']);;
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
          this.router.navigate(['auth', 'login']);
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
            this.router.navigate(['auth', 'login']);
            return throwError(() => err);
          })
        );
      }
  
}
