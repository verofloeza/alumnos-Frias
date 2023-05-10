import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../core/models/usuario.model';
import links from './nav-items';
import linksClient from './nav-items-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  title = this.router.url.substring(11);
  showFiller = false;
  links = links;
  linksClient = linksClient;
  authUser$: Observable<Usuario | null>
  destroyed$ = new Subject<void>();

  constructor(
    private authService : AuthService,
    private router: Router
  ){
    this.authUser$ = this.authService.userAuth()
   
  }

  getUrl(title: string): void{
    this.title = title;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout(): void {
    this.authService.logout();
  }
}
