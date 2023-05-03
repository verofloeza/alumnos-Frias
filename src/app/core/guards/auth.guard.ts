import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      const token = localStorage.getItem('token');
      console.log('token::: ', token);
      if (token !== null) {
        return this.authService.verificarToken().pipe(
          map((usuarioAutenticado) => {
            if (!usuarioAutenticado) {
              return this.router.createUrlTree(['auth', 'login']);
            } else {
              return true;
            }
          })
        );
      } else {
        return this.router.createUrlTree(['auth', 'login']);
      }
    }
  
}
