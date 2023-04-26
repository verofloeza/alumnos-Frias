export interface IAlumno {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    birthdate: Date;
    gender: String;
  }
  export class Alumno implements IAlumno {

    constructor(
      public id: number,
      public firstName: string,
      public lastName: string,
      public email: string,
      public age: number,
      public birthdate: Date,
      public gender: String,
    ) {}
  
    
  }