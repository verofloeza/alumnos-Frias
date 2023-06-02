import { Component, OnInit } from '@angular/core';

import { AbmUsersComponent } from './abm-users/abm-users.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/users/users.reducer';
import { Store } from '@ngrx/store';
import { UsersActions } from 'src/app/store/users/users.actions';
import { UsersService } from 'src/app/core/services/users.service';
import { Usuario } from 'src/app/core/models/usuario.model';
import { selectUsersState } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  state$: Observable<State>;

  displayedColumns: string[] = ['Nro', 'NombreApellido', 'Email', 'Role', 'Editar', 'Eliminar'];

  dataSource = new MatTableDataSource<Usuario>();


  constructor(
    public dialog: MatDialog,
      private usersService: UsersService,
      private httpClient: HttpClient,
      private store: Store
  ){

    this.state$ = this.store.select(selectUsersState)

    
    this.state$.subscribe((data) => {
        this.dataSource.data = data.usersLists;
      })
  
  }
  openDialog() {
    const dialogRef = this.dialog.open(AbmUsersComponent);
    dialogRef.afterClosed().subscribe(result => {
      
      if (result) {
        result={
            ...result,
            token: Math.random().toString(36).substr(2)
          }  
        this.store.dispatch(UsersActions.createUsers({ data: result}))
      }
    });
  }

  deleteUsuario(id: number): void{
    this.store.dispatch(UsersActions.deleteUsers({id}))
  }
  
  openEditUsuario(id: number, data : []){
    const dialogRef = this.dialog.open(AbmUsersComponent,{data: data});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(UsersActions.editeUsers({ data: result, id: id}))
        // this.httpClient.put<Usuario[]>(`http://localhost:3000/user/${id}`, result)
        //   .subscribe( (data) =>{
        //     this.usersService.getUsuarios()
        //   })
      }
    });
  }
  
  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers())
  }

}

