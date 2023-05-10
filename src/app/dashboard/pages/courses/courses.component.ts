import { AbmCoursesComponent } from './abm-courses/abm-courses.component';
import { Component } from '@angular/core';
import { Curso } from 'src/app/core/models';
import { CursosService } from '../../../core/services/cursos.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  dataSource = new MatTableDataSource<Curso>();
  displayedColumns: string[] = ['Nro', 'Nombre', 'FechaInicio', 'FechaFinalizacion', 'Editar', 'Eliminar'];

  constructor(
    public dialog: MatDialog,
    private CursosService: CursosService,
    private httpClient: HttpClient
    ){
    this.CursosService.curso
    .subscribe((curso)=>
      this.dataSource.data = curso
    )
  }

  openDialog() {
    const dialogRef = this.dialog.open(AbmCoursesComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.httpClient.post<Curso[]>('http://localhost:3000/courses', result)
          .subscribe( (data) =>{
            this.CursosService.curso
          })
      }
    });
  }
  editarCurso(curso: Curso): void {
    const id = curso.id
    const dialog = this.dialog.open(AbmCoursesComponent, {
      data: {
        curso
      }
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.httpClient.put<Curso[]>(`http://localhost:3000/courses/${id}`, valorDelFormulario)
          .subscribe( (data) =>{
            this.CursosService.curso
          })
      }
    })
  }
  eliminarCurso(id: number): void {
    this.CursosService.deleteCurso(id)
  }
}
