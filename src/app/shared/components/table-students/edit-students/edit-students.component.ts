import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Clase, Curso } from 'src/app/models';

@Component({
  selector: 'app-edit-students',
  templateUrl: './edit-students.component.html',
  styleUrls: ['./edit-students.component.scss']
})
export class EditStudentsComponent {
  constructor(private dialogRef: MatDialogRef<EditStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data: 
       {
         id: number,
         firstName: string,
         lastName: string,
         email: string,
         age: number,
         birthdate: Date,
         gender: String,
         course: string,
         classCourse: string,
         percent: number,
       }
    
    ) {}

  nombreControl = new FormControl(this.data.firstName, [Validators.required, Validators.minLength(3)]);
 apellidoControl = new FormControl(this.data.lastName, [Validators.required, Validators.minLength(5)]);
 emailControl = new FormControl(this.data.email, [Validators.required, Validators.email]);
 edadControl = new FormControl(this.data.age, [Validators.min(8)]);
 nacimientoControl = new FormControl(this.data.birthdate);
 generoControl = new FormControl(this.data.gender);
 notaControl = new FormControl(this.data.percent, [Validators.max(10)]);
 cursoControl = new FormControl(this.data.course, [Validators.required]);
 claseControl = new FormControl(this.data.classCourse, [Validators.required]);

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
