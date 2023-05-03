import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
    ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authService.userAuth()
      .pipe(
        map((usuarioAutenticado) => {
          if (usuarioAutenticado) {
            return this.router.createUrlTree(['dashboard']);
          } else {
            return true;
          }
        })
      )
    
    return true;
  }
  
}
