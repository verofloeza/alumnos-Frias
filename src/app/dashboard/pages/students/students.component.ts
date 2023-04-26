import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';

import { AbmStudentsComponent } from './abm-students/abm-students.component';
import { Alumno } from 'src/app/core/models';
import { AlumnosService } from '../../../core/services/alumnos.service';
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
        
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            id: this.dataSource.data.length + 1,
            ...result,
            
          }
        ];
      }
    });
  }

  deleteAlumno(id: number){
    this.alumnosService.deleteAlumno(id)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(
          (alumnos)=>{
            this.dataSource.data = [alumnos]
          }
        )
  }
  
  openEditAlumno(id: number, data : []){
    const dialogRef = this.dialog.open(AbmStudentsComponent,{data: data});
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
      }
    });
  }
  
  ngOnDestroy(): void {
    this.alumnosSubscription.unsubscribe();
    this.destroyed$.next(true);
  }

}
