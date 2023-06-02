import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { UsersActions } from './users.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {

  loadUserss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsersActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsuarios().pipe(
          map(data => UsersActions.loadUsersSuccess({ data })),
          catchError(error => of(UsersActions.loadUsersFailure({ error }))))
      )
    );
  });

  deleteUsers$ = createEffect(()=>{
    return this.actions$.pipe(

      ofType(UsersActions.deleteUsers), 
      concatMap((action) =>
        this.usersService.deleteUser(action.id).pipe(
          map(data => UsersActions.deleteUsersSuccess({ data: action.id })),
          catchError(error => of(UsersActions.deleteUsersFailure({ error }))))
      )
    );
  })

  createUsers$ = createEffect(()=>{
    return this.actions$.pipe(

      ofType(UsersActions.createUsers), 
      concatMap((action) =>
        this.usersService.createUsers(action.data).pipe(
          map(data => UsersActions.createUsersSuccess({ data: data })),
          catchError(error => of(UsersActions.createUsersFailure({ error }))))
      )
    );
  })

  editeUsers$ = createEffect(()=>{
    return this.actions$.pipe(

      ofType(UsersActions.editeUsers), 
      concatMap((action) =>
        this.usersService.editeUsers(action.data, action.id).pipe(
          map(data => UsersActions.editeUsersSuccess({ data: data })),
          catchError(error => of(UsersActions.editeUsersFailure({ error }))))
      )
    );
  })

  constructor(
    private actions$: Actions,
    private usersService: UsersService  
  ) {}
}
