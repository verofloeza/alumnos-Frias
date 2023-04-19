export interface ICurso {
    value: string;
  }
  export class Curso implements ICurso {

    constructor(
      public value: string,
    ) {}
  
    
  }