import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno, Curso } from 'src/app/core/models';
import { AlumnosService } from 'src/app/core/services/alumnos.service';
import { CursosService } from 'src/app/core/services/cursos.service';

@Component({
  selector: 'app-abm-inscription',
  templateUrl: './abm-inscription.component.html',
  styleUrls: ['./abm-inscription.component.scss']
})
export class AbmInscriptionComponent {
  alumnosBD: Alumno[] = [];
  cursosBD: Curso[] = [];

  constructor(
    private dialogRef: MatDialogRef<AbmInscriptionComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any,
    private cursosService: CursosService,
    private alumnosService: AlumnosService
  ){
    this.cursosService.curso
    .subscribe((curso)=>{
        this.cursosBD =  curso;
      }
      
    )
    
    this.alumnosService.getAlumnos()
        .subscribe((alumnos) => {
          this.alumnosBD = alumnos;
        })
    if(data){
      console.log(data)
      this.alumnoControl.setValue(data.inscripcion.student.id),
      this.cursoControl.setValue(data.inscripcion.course.id)
    }
  }
  
  alumnoControl = new FormControl([]);
  cursoControl = new FormControl([]);

  inscripcionForm = new FormGroup({
    student: this.alumnoControl,
    course: this.cursoControl
  })
  

  guardar(): void {
    if (this.inscripcionForm.valid) {
      this.dialogRef.close(this.inscripcionForm.value)
    } else {
      this.inscripcionForm.markAllAsTouched();
    }
  }
  
}
