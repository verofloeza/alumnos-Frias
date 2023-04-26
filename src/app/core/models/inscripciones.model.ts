export interface IInscripcion {
    id: number;
    date: Date;
    students: [];
    courses:[];
  }
  export class Inscripciones implements IInscripcion {

    constructor(
      public id: number,
      public date: Date,
      public students: [],
      public courses: []
    ) {}
  
    
  }