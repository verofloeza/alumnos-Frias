import { AbmCoursesComponent } from './abm-courses/abm-courses.component';
import { Component } from '@angular/core';
import { Curso } from 'src/app/core/models';
import { CursosService } from '../../../core/services/cursos.service';
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
    private CursosService: CursosService
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
  editarCurso(curso: Curso): void {
    const dialog = this.dialog.open(AbmCoursesComponent, {
      data: {
        curso
      }
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.dataSource.data = this.dataSource.data.map(
          (cursoActual) => cursoActual.id === curso.id
            ? ({ ...cursoActual, ...valorDelFormulario}) 
            : cursoActual,
        );
      }
    })
  }
  eliminarCurso(id: number): void {
    this.CursosService.deleteCurso(id)
    .subscribe(
      (cursosActuales)=>{
        this.dataSource.data = cursosActuales
      }
    )
  }
}
