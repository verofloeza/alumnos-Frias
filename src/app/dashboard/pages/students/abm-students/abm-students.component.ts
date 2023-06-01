import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-students',
  templateUrl: './abm-students.component.html',
  styleUrls: ['./abm-students.component.scss']
})
export class AbmStudentsComponent{
  
  constructor(
    private dialogRef: MatDialogRef<AbmStudentsComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
    ) {
      if(data){
        
        this.nombreControl.setValue(data.firstName),
        this.apellidoControl.setValue(data.lastName),
        this.emailControl.setValue(data.email),
        this.edadControl.setValue(data.age),
        this.generoControl.setValue(data.gender)
      }
    }

  nombreControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  edadControl = new FormControl('', [Validators.min(8)]);
  nacimientoControl = new FormControl(new Date());
  generoControl = new FormControl('');

  alumnosForm = new FormGroup({
    firstName: this.nombreControl,
    lastName: this.apellidoControl,
    email: this.emailControl,
    age: this.edadControl,
    birthdate: this.nacimientoControl,
    gender: this.generoControl
  });


  guardar(): void {
    if (this.alumnosForm.valid) {
      this.dialogRef.close(this.alumnosForm.value)
    } else {
      this.alumnosForm.markAllAsTouched();
    }
  }

}
