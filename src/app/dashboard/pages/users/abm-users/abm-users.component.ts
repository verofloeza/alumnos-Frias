import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-abm-users',
  templateUrl: './abm-users.component.html',
  styleUrls: ['./abm-users.component.scss']
})
export class AbmUsersComponent {
  constructor(
    private dialogRef: MatDialogRef<AbmUsersComponent>,
    @Inject(MAT_DIALOG_DATA) private data:any
  ){
    if(data){
      this.nombreControl.setValue(data.firstName),
      this.apellidoControl.setValue(data.lastName),
      this.emailControl.setValue(data.email),
      this.passControl.setValue(data.pass),
      this.roleControl.setValue(data.role)
    }
  }
  nombreControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  apellidoControl = new FormControl('', [Validators.required, Validators.minLength(5)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passControl = new FormControl('', [Validators.required])
  roleControl = new FormControl('', [Validators.required]);

  usuarioForm = new FormGroup({
    firstName: this.nombreControl,
    lastName: this.apellidoControl,
    email: this.emailControl,
    pass: this.passControl,
    role: this.roleControl
  })

  guardar(): void {
    if (this.usuarioForm.valid) {
      
      this.dialogRef.close(this.usuarioForm.value)
    } else {
      this.usuarioForm.markAllAsTouched();
    }
  }
}
