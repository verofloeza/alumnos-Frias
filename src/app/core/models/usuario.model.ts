export interface Usuario {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    pass: string;
    token: string;
    role: string;
  }

  export interface UsuarioCreate {
    firstName: string;
    lastName: string;
    email: string;
    pass: string;
    token: string;
    role: string;
  }