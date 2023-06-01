import { Alumno, Curso, Inscripciones } from 'src/app/core/models';

import { AbmInscriptionComponent } from './abm-inscription/abm-inscription.component';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { CursosService } from 'src/app/core/services/cursos.service';
import { HttpClient } from '@angular/common/http';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {
  inscripcionDB: Inscripciones[] = [];
  alumnosBD: Alumno[] = [];
  cursosBD: Curso[] = [];
  panelOpenCursoState = false;
  panelOpenAlumnoState = false;
  dataSource = new MatTableDataSource<Inscripciones>();
  role: string | undefined = '';
  displayedColumns: string[] = [];

  constructor(
    public dialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private httpClient: HttpClient,
    private authService: AuthService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService
  ){
    this.inscripcionesService.inscripcion
    .subscribe(
      (result) => this.inscripcionDB = result
    ) 
    this.cursosService.curso
    .subscribe((curso)=>{
        this.cursosBD =  curso;
      }
    )
    this.alumnosService.getAlumnos()
        .subscribe((alumnos) => {
          this.alumnosBD = alumnos;
        })
    
        this.inscripcionesService.inscripcion.subscribe((inscripciones) => {
          this.dataSource.data = inscripciones.map((inscripcion: { student: number; course: number; }) => {
            const alumno = this.alumnosBD.find((alumno) => alumno.id === inscripcion.student);
            const curso = this.cursosBD.find((curso) => curso.id === inscripcion.course);
            return {
              ...inscripcion,
              student: alumno,
              course: curso,
            };
          });
        });
    this.authService.userAuth()
        .subscribe((role)=>{
          this.role = role?.role;
          if(this.role === 'estudiante'){
            this.displayedColumns= ['Nro', 'Alumno', 'Curso', 'FechaInscripcion'];
          }else{
            this.displayedColumns= ['Nro', 'Alumno', 'Curso', 'FechaInscripcion', 'Editar', 'Eliminar']
          }
        })
  }



  openDialog() {
    const dialogRef = this.dialog.open(AbmInscriptionComponent);
    const now = new Date();
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result = {
          ...result,
          date: now
        }
        this.httpClient.post<Inscripciones[]>('http://localhost:3000/inscription', result)
          .subscribe( (data) =>{
            this.inscripcionesService.inscripcion
          })
      }
    });
  }
  editarInscripcion(inscripcion: Inscripciones): void {
    const dialog = this.dialog.open(AbmInscriptionComponent, {
      data: {
        inscripcion
      }
    });
    dialog.afterClosed().subscribe((valorDelFormulario) => {
      if (valorDelFormulario) {
        this.httpClient.put<Inscripciones[]>(`http://localhost:3000/inscription/${inscripcion.id}`, valorDelFormulario)
          .subscribe( (data) =>{
            this.inscripcionesService.inscripcion
          })
      }
    })
  }

  eliminarInscripcion(id: number): void {
    this.inscripcionesService.deleteInscripcion(id)
  }

}
