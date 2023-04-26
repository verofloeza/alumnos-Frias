import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../../../../core/models/cursos.model';

@Component({
  selector: 'app-abm-courses',
  templateUrl: './abm-courses.component.html',
  styleUrls: ['./abm-courses.component.scss']
})
export class AbmCoursesComponent {

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  inicioControl = new FormControl(new Date());
  finalizacionControl = new FormControl(new Date());

  cursosForm = new FormGroup({
    name : this.nombreControl,
    startDate: this.inicioControl,
    endDate: this.finalizacionControl
  })

  range = new FormGroup({
    start:this.inicioControl,
    end: this.finalizacionControl,
  });

  constructor(
    private dialogRef: MatDialogRef<AbmCoursesComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
    ){
      if(data){
        this.nombreControl.setValue(data.curso.name),
        this.inicioControl.setValue(data.curso.startDate),
        this.finalizacionControl.setValue(data.curso.endDate)
      }
    }
  

  guardar(): void {
    if (this.cursosForm.valid) {
      this.cursosForm.value.startDate= this.range.value.start;
      this.cursosForm.value.endDate= this.range.value.end;
      this.dialogRef.close(this.cursosForm.value)
    } else {
      this.cursosForm.markAllAsTouched();
    }
  }
}
