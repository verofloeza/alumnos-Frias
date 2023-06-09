interface NavItem {
    path: string;
    title: string;
    icon?: string;
  }
  
  const links: NavItem[] = [
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
    {
      path: 'usuarios',
      title: 'Usuarios',
      icon: 'account_circle',
  },
  ]
  
  export default links;