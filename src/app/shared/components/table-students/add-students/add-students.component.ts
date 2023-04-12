import { Clase, Curso } from 'src/app/models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-students',
  templateUrl: './add-students.component.html',
  styleUrls: ['./add-students.component.scss']
})
export class AddStudentsComponent{
  
  constructor(private dialogRef: MatDialogRef<AddStudentsComponent>) {}

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  edadControl = new FormControl('', [Validators.min(8)]);
  nacimientoControl = new FormControl(new Date());
  generoControl = new FormControl('');
  notaControl = new FormControl('', [Validators.max(10)]);
  cursoControl = new FormControl('', [Validators.required]);
  claseControl = new FormControl('', [Validators.required]);

  alumnosForm = new FormGroup({
    firstName: this.nombreControl,
    lastName: this.apellidoControl,
    email: this.emailControl,
    age: this.edadControl,
    birthdate: this.nacimientoControl,
    gender: this.generoControl,
    percent: this.notaControl,
    course: this.cursoControl,
    classCourse: this.claseControl
  });

  cursos: Curso[] = [
    new Curso('Curso Angular'),
    new Curso('Curso Vue'),
    new Curso('Curso React')
  ]

  clases : Clase[] = [
    new Clase('Clase 1'),
    new Clase('Clase 2'),
    new Clase('Clase 3'),
  ]

  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value)
    } else {
      this.alumnosForm.markAllAsTouched();
    }
  }

}
