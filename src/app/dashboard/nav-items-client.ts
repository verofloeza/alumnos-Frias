interface NavItem {
    path: string;
    title: string;
    icon?: string;
  }
  
  const linksClient: NavItem[] = [
    {
      path: 'estudiantes',
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
        title: 'Inscripciones',
        icon: 'assignment_ind',
    },
  ]
  
  export default linksClient;