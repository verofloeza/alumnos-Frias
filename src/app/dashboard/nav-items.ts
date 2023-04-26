interface NavItem {
    path: string;
    title: string;
    icon?: string;
  }
  
  const links: NavItem[] = [
    {
      path: '',
      title: 'Estudiantes',
      icon: 'person',
    },
    {
        path: 'cursos',
        title: 'Cursos',
        icon: 'school',
    },
    {
        path: 'inscripciones',
        title: 'Incripciones',
        icon: 'assignment_ind',
    },
  ]
  
  export default links;