import {
  SALVA_EMAIL,
  SALVA_NOME,
  FAZ_LOGOUT } from '../actions';

const INITIAL_STATE = {
  email: '',
  nome: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALVA_EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case SALVA_NOME:
    return {
      ...state,
      nome: action.payload,
    };
  case FAZ_LOGOUT:
    return {
      nome: '',
      email: '',
    };
  default:
    return state;
  }
};

export default user;
