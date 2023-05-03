import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../core/models/usuario.model';
import links from './nav-items';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  showFiller = false;
  links = links;
  authUser$: Observable<Usuario | null>
  destroyed$ = new Subject<void>();

  constructor(
    private authService : AuthService,
    private router: Router
  ){
    this.authUser$ = this.authService.userAuth()
    
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }
}
