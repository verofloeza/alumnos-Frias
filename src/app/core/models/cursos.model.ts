export interface ICurso {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
  }
  export class Curso implements ICurso {

    constructor(
      public id: number,
      public name: string,
      public startDate: Date,
      public endDate: Date
    ) {}
  
    
  }