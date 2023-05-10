import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { Alumno } from 'src/app/core/models';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { HttpClient } from '@angular/common/http';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnDestroy{

    displayedColumns: string[] = ['Nro', 'NombreApellido', 'Email', 'Edad', 'FechaNacimiento', 'Genero', 'Editar', 'Eliminar'];

    dataSource = new MatTableDataSource<Alumno>();
    
    private alumnosSubscription: Subscription;
    private destroyed$ = new Subject();
    
    constructor(
      public dialog: MatDialog,
      private alumnosService: AlumnosService,
      private httpClient: HttpClient
      
      ) {
        this.alumnosSubscription = this.alumnosService.getAlumnos()
        .subscribe((alumnos) => {
          this.dataSource.data = alumnos;
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
