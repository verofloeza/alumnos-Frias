import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersComponent } from './users.component';
import { UsersService } from 'src/app/core/services/users.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        RouterTestingModule,
        MatDialogModule,
        MatTableModule,
        MatButtonModule,
        PipesModule,
        DirectivesModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatIconModule,
        HttpClientModule
      ],
      providers: [
        UsersService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener todos los usuarios', () =>{
    const spyOnAuthServiceLogin = spyOn(TestBed.inject(UsersService), 'getUsuarios');
    component.
  })

});
