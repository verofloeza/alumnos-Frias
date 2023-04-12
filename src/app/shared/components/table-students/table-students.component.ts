import { AddStudentsComponent } from './add-students/add-students.component';
import { Alumno } from 'src/app/models';
import { Component } from '@angular/core';
import { EditStudentsComponent } from './edit-students/edit-students.component';
import {MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})

export class TableStudentsComponent {
  constructor(public dialog: MatDialog) {}

  alumnos : Alumno[] = [
    new Alumno(1, 'Veronica', 'Frias', 'vero@gmail.com', 8,  new Date('1986-12-15'), 'F', 'Curso React', 'Clase 2', 10),
    new Alumno(2, 'Marcos', 'Lopez', 'marcos@gmail.com', 15,  new Date('1979-4-2'), 'M', 'Curso Angular', 'Clase 1', 8),
  ]

  
  
  
  displayedColumns: string[] = ['Nro', 'NombreApellido', 'Email', 'Edad', 'FechaNacimiento', 'Genero', 'Curso', 'Clase', 'Nota', 'Editar', 'Eliminar'];
  

  dataSource = new MatTableDataSource(this.alumnos);


  openDialog() {
    const dialogRef = this.dialog.open(AddStudentsComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(this.dataSource.data);
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
    const newData = this.dataSource.data;
    this.dataSource.data = newData.filter((i)=> i.id !== id)
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
      }
    });
  }
}


