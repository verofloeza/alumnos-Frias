export interface IInscripcion {
    id: number;
    date: Date;
    student: number;
    course:number;
  }
  export class Inscripciones implements IInscripcion {

    constructor(
      public id: number,
      public date: Date,
      public student: number,
      public course: number
    ) {}
  
    
  }