import { Usuario, UsuarioCreate } from 'src/app/core/models/usuario.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: Usuario[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),
    'Delete Users': props<{ id: number }>(),
    'Delete Users Success': props<{ data: number }>(),
    'Delete Users Failure': props<{ error: unknown }>(),
    'Create Users': props<{ data: UsuarioCreate }>(),
    'Create Users Success': props<{ data: Usuario }>(),
    'Create Users Failure': props<{ error: unknown }>(),
    'Edite Users': props<{ data: Usuario, id: number }>(),
    'Edite Users Success': props<{ data: Usuario }>(),
    'Edite Users Failure': props<{ error: unknown }>(),
  }
});
