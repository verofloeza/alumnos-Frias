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

interface AlumnoInscrip {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  birthdate: Date;
  gender: String;
  inscription: number;
}


@Component({
  selector: 'app-details-courses',
  templateUrl: './details-courses.component.html',
  styleUrls: ['./details-courses.component.scss']
})

export class DetailsCoursesComponent {
  role: string | undefined = '';
  cursoDet: Curso[] | undefined;
  alumnos: Alumno[] | undefined;
  inscripciones : Inscripciones[] | undefined;

  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource<AlumnoInscrip>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private alumnosServices: AlumnosService,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,
    public dialog: MatDialog,
    private httpClient: HttpClient,
  ){
    this.cursosService.curso
    .subscribe((cursoDet) =>{
      this.cursoDet = cursoDet.filter((i: any) => i.id === parseInt(this.activatedRoute.snapshot.params['id']))
    });

    this.alumnosServices.getAlumnos()
    .subscribe((alumnos)=>{
        this.alumnos = alumnos
        this.getInsripciones() 
    })

    this.inscripcionesService.inscripcion
      .subscribe(
        (result) => this.inscripciones = result
    )

    this.authService.userAuth()
      .subscribe((role)=>{
        this.role = role?.role;
        if(this.role === 'estudiante'){
          this.displayedColumns= ['NombreCompleto', 'Email', 'FechaCumpleaños'];
        }else{
          this.displayedColumns= ['NombreCompleto', 'Email', 'FechaCumpleaños', 'Eliminar']
        }
      })

  }

  getInsripciones(): void{
    this.inscripcionesService.getInscripcionesByCursoId(parseInt(this.activatedRoute.snapshot.params['id']))
    .subscribe((inscripciones) => {
      this.inscripciones = inscripciones;
      this.obtenerAlumnosDeInscripciones(inscripciones);
    });
  }
  obtenerAlumnosDeInscripciones(inscripciones: Inscripciones[]): void {
    console.log(inscripciones)
    const idsAlumnos = inscripciones.map((inscripcion) => inscripcion.student);
    const observablesAlumnos = idsAlumnos.map((idAlumno) => this.alumnosServices.getAlumnoById(idAlumno));
    forkJoin(observablesAlumnos).subscribe((alumno) => {
      const data = alumno.map((alumno, index) => ({
        id: alumno.id,
        firstName: alumno.firstName,
        lastName: alumno.lastName,
        email: alumno.email,
        age: alumno.age,
        birthdate: alumno.birthdate,
        gender: alumno.gender,
        inscription: inscripciones[index].id
      }));
      this.dataSource.data = data;
    });
  }
  openDialog() {
    const cursoSelec = this.cursoDet ? this.cursoDet[0] : undefined
    const dialogRef = this.dialog.open(AbmInscriptionComponent,{
      data:{
        inscripcion:{
          student: {},
          course: cursoSelec
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
