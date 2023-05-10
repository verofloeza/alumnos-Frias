import { AuthService } from 'src/app/core/services/auth.service';
import { AuthServiceMocks } from 'src/app/mocks/auth-services.mocks';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from "./login.component"
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';

describe('Test de LoginComponent', ()=>{
    let component: LoginComponent;
    beforeEach( async ()=>{
        await TestBed.configureTestingModule({
           declarations:[
            LoginComponent,
           ],
           imports:[
            RouterTestingModule,
            PipesModule,
            DirectivesModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            HttpClientModule,
            BrowserAnimationsModule
           ],
           providers: [
            {
                provide: AuthService,
                useClass: AuthServiceMocks
            }
           ]
        }).compileComponents();
        const fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })
    
    it('Verificar que cuando el email se encuentra vacio el FormControl debe dar inválido ', ()=>{
        component.loginForm.setValue({ email: null, pass: null })
        expect(component.emailControl.invalid).toBeTrue();
    })

    it('Verificar que cuando la contraseña se encuentra vacio el FormControl debe dar inválido ', ()=>{
        component.loginForm.setValue({ email: null, pass: null })
        expect(component.passwordControl.invalid).toBeTrue();
    })
    
    it('Si el LoginForm es inválido se deben marcar todos los controles con error', ()=>{
        component.loginForm.setValue({ email: null, pass: null })
        const spy = spyOn(component.loginForm, "markAllAsTouched");
        component.onSubmit();
        expect(spy).toHaveBeenCalled()
    })

    it('Verificar que el LoginForm sea válido', ()=>{
        component.loginForm.setValue({ email: "test@gmail.com", pass: "1234" })
        const spy = spyOn(TestBed.inject(AuthService), "login");
        component.onSubmit();
        expect(component.loginForm.valid).toBeTrue()
        expect(spy).toHaveBeenCalled()
    })

})