import { createFeature, createReducer, on } from '@ngrx/store';

import { UsersActions } from './users.actions';
import { Usuario } from '../../core/models/usuario.model';

export const usersFeatureKey = 'users';

export interface State {
  loading: boolean;
  usersLists: Usuario[];
  error: unknown;
}

export const initialState: State = {
  loading: false,
  usersLists: [],
  error: null
};

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state =>
    {
      return {
        ...state,
        loading: true
      }
    }
    ),
  on(UsersActions.loadUsersSuccess, (state, action) => 
  {
    return {
      ...state,
      loading: false,
      usersLists: action.data
    }
  }
  ),
  on(UsersActions.loadUsersFailure, (state, action) => 
    {
      return {
        ...state,
        loading: false,
        error: action.error
      }
    }
  ),
  // Eliminar

  on(UsersActions.deleteUsers, (state) => {
    return {
      ...state,
      loading: true
    }
  }),

  on(UsersActions.deleteUsersSuccess, (state, action) => {
    return {
      ...state,
      usersLists: state.usersLists.filter((i) => i.id !== action.data),
      loading: false
    };
  }),

  on(UsersActions.deleteUsersFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }),

   // Agregar
   on(UsersActions.createUsers, state => {
    return {
      ...state,
      loading: true,
    }
  }),

  on(UsersActions.createUsersSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usersLists: [...state.usersLists, action.data]
    }
  }),

  on(UsersActions.createUsersFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

  // Editar
  on(UsersActions.editeUsers, state => {
    return {
      ...state,
      loading: true,
    }
  }),

  on(UsersActions.editeUsersSuccess, (state, action) => {
    return {
      ...state,
      loading: false,
      usersLists: state.usersLists.map(user => {
        if (user.id === action.data.id) {
          return action.data;
        }
        return user;
      })
    }
  }),

  on(UsersActions.editeUsersFailure, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }),

);


export const usersFeature = createFeature({
  name: usersFeatureKey,
  reducer,
});

