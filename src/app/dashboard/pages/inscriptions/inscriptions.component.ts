import { AbmInscriptionComponent } from './abm-inscription/abm-inscription.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Inscripciones } from 'src/app/core/models';
import { InscripcionesService } from 'src/app/core/services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent {

  panelOpenCursoState = false;
  panelOpenAlumnoState = false;
  dataSource = new MatTableDataSource<Inscripciones>();
  role: string | undefined = '';
  displayedColumns: string[] = [];

  constructor(
    public dialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private httpClient: HttpClient,
    private authService: AuthService
  ){
    this.inscripcionesService.inscripcion
    .subscribe(
      (result) => this.dataSource.data = result
    )
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
