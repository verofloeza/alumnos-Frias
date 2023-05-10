import { AuthService, LoginFormValue } from './auth.service';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';

import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { Usuario } from '../models/usuario.model';
import { skip } from 'rxjs';

describe('Test de AuthService', ()=>{
    let service: AuthService;
    let httpController: HttpTestingController;
    beforeEach( async ()=>{
        await TestBed.configureTestingModule({
           imports:[
            HttpClientTestingModule,
           ]
        }).compileComponents();

        service = TestBed.inject(AuthService)
        httpController = TestBed.inject(HttpTestingController)
    })

    it( 'Login funcionando con su usuario y contraseña', (done) =>{
        const LoginKake: LoginFormValue = {
            email: "test@gmail.com",
            pass: "1234"
        }
        const MOCK_RESULT: Usuario[] = [
            {
                id: 1,
                firstName: 'testapellido',
                lastName: 'testnombre',
                email: 'test@gmail.com',
                role: 'admin',
                token: 'asdkjsanfkdams3u2hjdasfadsuh',
                pass: '1234',
            }
        ]
        spyOn(TestBed.inject(Router), 'navigate');
        service
        .userAuth()
        .pipe(skip(1))
        .subscribe((usuario) =>{
            expect(usuario).toEqual(MOCK_RESULT[0]);
            done();
        })
        service.login(LoginKake);
        httpController
            .expectOne({
                url: `http://localhost:3000/user?email=${LoginKake.email}&pass=${LoginKake.pass}`,
                method: 'GET',
            })
            .flush(MOCK_RESULT)
        
        const tokenLs = localStorage.getItem('token');

        expect(tokenLs).toBe(MOCK_RESULT[0].token);

    } )

    it('El logout debe emitir un authUser null, remover el token del Localstorage y redireccionar al usuario',
    () => {
        const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
        const loginFake: LoginFormValue = {
            email: "test@gmail.com",
            pass: "1234"
        };
        const MOCK_REQUEST_RESULT: Usuario[] = [
            {
                id: 1,
                firstName: 'testapellido',
                lastName: 'testnombre',
                email: 'test@gmail.com',
                role: 'admin',
                token: 'asdkjsanfkdams3u2hjdasfadsuh',
                pass: '1234',
            },
        ];

        service.login(loginFake);
        httpController
        .expectOne({
            url: `http://localhost:3000/user?email=${loginFake.email}&pass=${loginFake.pass}`,
            method: 'GET',
        })
        .flush(MOCK_REQUEST_RESULT);


        service.logout();

        const tokenLs = localStorage.getItem('token');

        expect(tokenLs).toBeNull();
        expect(spyOnNavigate).toHaveBeenCalled();
    });
    
})