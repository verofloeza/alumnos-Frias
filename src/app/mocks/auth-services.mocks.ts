import { BehaviorSubject, Observable, of } from 'rxjs';

import { LoginFormValue } from "../core/services/auth.service";
import { Usuario } from "../core/models/usuario.model";

export const USUARIO_ADMIN_MOCK: Usuario = {
    id: 1,
    firstName: 'testapellido',
    lastName: 'testnombre',
    email: 'test@gmail.com',
    role: 'admin',
    token: 'asdkjsanfkdams3u2hjdasfadsuh',
    pass: '1234',
  }
export class AuthServiceMocks {
    private authUser$ = new BehaviorSubject<Usuario | null>(null);

  login(formValue: LoginFormValue): void {
    this.authUser$.next(USUARIO_ADMIN_MOCK);
  }

  verificarToken(): Observable<boolean> {
    return of(true);
  }
}