import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { AddStudentsComponent } from './add-students/add-students.component';
import { Alumno } from 'src/app/core/models';
import { AlumnosService } from '../../../core/services/alumnos.service';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})

export class TableStudentsComponent implements OnDestroy {

  displayedColumns: string[] = ['Nro', 'NombreApellido', 'Email', 'Edad', 'FechaNacimiento', 'Genero', 'Curso', 'Clase', 'Nota', 'Editar', 'Eliminar'];

    dataSource = new MatTableDataSource<Alumno>();

    alumnoNew$: Observable<[]>;
    
    private alumnosSubscription: Subscription;
    private destroyed$ = new Subject();
    
    constructor(
      public dialog: MatDialog,
      private alumnosService: AlumnosService,
      
      
      ) {
        this.alumnosSubscription = this.alumnosService.getAlumnos()
        .subscribe((alumnos) => {
          this.dataSource.data = alumnos;
        })
        
          this.alumnoNew$ = this.alumnosService.ultimoAlumno(this.dataSource.data)
   
            
        }

  openDialog() {
    const dialogRef = this.dialog.open(AddStudentsComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            id: this.dataSource.data.length + 1,
            ...result,
            
          }
        ];
        this.alumnoNew$ = this.alumnosService.ultimoAlumno(this.dataSource.data)
      }
    });
  }

  deleteAlumno(id: number){
    this.alumnosService.deleteAlumno(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
          (alumnos)=>{
            this.dataSource.data = [alumnos]
            this.alumnoNew$ = this.alumnosService.ultimoAlumno(this.dataSource.data)
          }
        )
    // const newData = this.dataSource.data;
    // this.dataSource.data = this.dataSource.data.filter((i)=> i.id !== id)
  }
  
  openEditAlumno(id: number, data : []){
    const dialogRef = this.dialog.open(EditStudentsComponent,{data: data});
    dialogRef.afterClosed().subscribe(result => {
      const newData = this.dataSource.data;
      if (result) {
        this.dataSource.data = newData.filter((i)=> i.id !== id)
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            id: id,
            ...result,
          }
        ];
        this.alumnoNew$ = this.alumnosService.ultimoAlumno(this.dataSource.data)
      }
    });
  }
  
  ngOnDestroy(): void {
    this.alumnosSubscription.unsubscribe();
    this.destroyed$.next(true);
  }
}


