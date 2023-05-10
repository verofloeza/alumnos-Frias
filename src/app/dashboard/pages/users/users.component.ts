import { Component, OnDestroy } from '@angular/core';

import { AbmUsersComponent } from './abm-users/abm-users.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { Usuario } from 'src/app/core/models/usuario.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  displayedColumns: string[] = ['Nro', 'NombreApellido', 'Email', 'Role', 'Editar', 'Eliminar'];

  dataSource = new MatTableDataSource<Usuario>();


  private usuariosSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
      private usersService: UsersService,
      private httpClient: HttpClient
  ){

    this.usuariosSubscription = this.usersService.getUsuarios()
    .subscribe((data) => this.dataSource.data = data)
  
  }
  openDialog() {
    const dialogRef = this.dialog.open(AbmUsersComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          
          result={
            ...result,
            token: Math.random().toString(36).substr(2)
          }
          this.httpClient.post<Usuario[]>('http://localhost:3000/user', result)
          .subscribe( (data) =>{
            this.usersService.getUsuarios()
          })
      }
    });
  }

  deleteUsuario(id: number){
    this.usersService.deleteUser(id)
  }
  
  openEditUsuario(id: number, data : []){
    const dialogRef = this.dialog.open(AbmUsersComponent,{data: data});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpClient.put<Usuario[]>(`http://localhost:3000/user/${id}`, result)
          .subscribe( (data) =>{
            this.usersService.getUsuarios()
          })
      }
    });
  }
  
  ngOnDestroy(): void {
    this.usuariosSubscription.unsubscribe();
  }
}

