import { Alumno, Curso, Inscripciones } from 'src/app/core/models';

import { AbmInscriptionComponent } from '../../../inscriptions/abm-inscription/abm-inscription.component';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { CursosService } from 'src/app/core/services/cursos.service';
import { HttpClient } from '@angular/common/http';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';

interface CursoIncrip {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    inscription: number
}

@Component({
  selector: 'app-details-students',
  templateUrl: './details-students.component.html',
  styleUrls: ['./details-students.component.scss']
})
export class DetailsStudentsComponent {
  role: string | undefined = '';
  alumnoDet: Alumno[] | undefined;
  cursos: Curso[] | undefined;
  inscripciones : Inscripciones[] | undefined;

  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<CursoIncrip>();

  constructor(
    private activateRoute: ActivatedRoute,
    private alumnosService: AlumnosService,
    private authService: AuthService,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    public dialog: MatDialog,
    private httpClient: HttpClient,
  ){
    this.alumnosService.getAlumnos()
      .subscribe((alumnoDet) =>{
        this.alumnoDet = alumnoDet.filter((i) => i.id === parseInt(this.activateRoute.snapshot.params['id']))
      });
    
    this.inscripcionesService.inscripcion
      .subscribe(
        (result) => this.inscripciones = result
    )
    
    this.cursosService.curso
      .subscribe((curso)=>{
        this.dataSource.data = curso
        this.cursos = curso
        this.getInsripciones() 
      }
        
      )
    

    this.authService.userAuth()
      .subscribe((role)=>{
        this.role = role?.role;
        if(this.role === 'estudiante'){
          this.displayedColumns= ['NombreCurso', 'FechaInicio', 'FechaFinalizacion'];
        }else{
          this.displayedColumns= ['NombreCurso', 'FechaInicio', 'FechaFinalizacion', 'Eliminar']
        }
      })
  }

  getInsripciones(): void{
    this.inscripcionesService.getInscripcionesByAlumnoId(parseInt(this.activateRoute.snapshot.params['id']))
    .subscribe((inscripciones) => {
      this.inscripciones = inscripciones;
      this.obtenerAlumnoDeInscripciones(inscripciones);
    });
  }
  obtenerAlumnoDeInscripciones(inscripciones: Inscripciones[]): void {
    const idsCursos = inscripciones.map((inscripcion) => inscripcion.course);
    const observablesCursos = idsCursos.map((idCurso) => this.cursosService.getCursoById(idCurso));
    forkJoin(observablesCursos).subscribe((cursos) => {
      const data = cursos.map((curso, index) => ({
        id: curso.id,
        name: curso.name,
        startDate: curso.startDate,
        endDate: curso.endDate,
        inscription: inscripciones[index].id
      }));
      this.dataSource.data = data;
    });
  }
  openDialog() {
    const estudiante = this.alumnoDet ? this.alumnoDet[0] : undefined
    const dialogRef = this.dialog.open(AbmInscriptionComponent,{
      data:{
        inscripcion:{
          student: estudiante,
          course: {}
        }
      }
    });
    const now = new Date();
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result = {
          ...result,
          date: now
        }
          this.httpClient.post<Inscripciones[]>('http://localhost:3000/inscription', result)
          .subscribe( (data) =>{
            this.getInsripciones()
          })
      }
    });
  }
  
  eliminarInscripcion(id: number): void {
    this.inscripcionesService.deleteInscripcion(id)
    this.getInsripciones()
  }
}
