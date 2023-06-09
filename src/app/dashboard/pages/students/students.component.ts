import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';

import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { Alumno } from 'src/app/core/models';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnDestroy{

    role: string | undefined = '';

    displayedColumns: string[] = [];

    dataSource = new MatTableDataSource<Alumno>();
    
    private alumnosSubscription: Subscription;
    private destroyed$ = new Subject();
    
    constructor(
      public dialog: MatDialog,
      private alumnosService: AlumnosService,
      private httpClient: HttpClient,
      private authService: AuthService,
      private router: Router
      ) {
        this.alumnosSubscription = this.alumnosService.getAlumnos()
        .subscribe((alumnos) => {
          this.dataSource.data = alumnos;
          console.log(this.dataSource.data)
        })
        this.authService.userAuth()
        .subscribe((role)=>{
          this.role = role?.role;
          if(this.role === 'estudiante'){
            this.displayedColumns= ['Nro', 'NombreApellido', 'Email', 'Edad', 'FechaNacimiento', 'Genero', 'Ver'];
          }else{
            this.displayedColumns= ['Nro', 'NombreApellido', 'Email', 'Edad', 'FechaNacimiento', 'Genero','Editar', 'Eliminar', 'Ver']
          }
        })
            
        }

  openDialog() {
    const dialogRef = this.dialog.open(AbmStudentsComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.httpClient.post<Alumno[]>('http://localhost:3000/students', result)
          .subscribe( (data) =>{
            this.alumnosService.getAlumnos()
          })
      }
    });
  }

  deleteAlumno(id: number){
    this.alumnosService.deleteAlumno(id)
  }

  verAlumno( id: number){
    this.router.navigate(['./dashboard/estudiantes/detalle/' + id]);
  }
  
  openEditAlumno(id: number, data : []){
    const dialogRef = this.dialog.open(AbmStudentsComponent,{data: data});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpClient.put<Alumno[]>(`http://localhost:3000/students/${id}`, result)
          .subscribe( (data) =>{
            this.alumnosService.getAlumnos()
          })
      }
    });
  }
  
  ngOnDestroy(): void {
    this.alumnosSubscription.unsubscribe();
    this.destroyed$.next(true);
  }

}
