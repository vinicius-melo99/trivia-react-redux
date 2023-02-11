import { SALVA_EMAIL, SALVA_NOME } from '../actions';

const INITIAL_STATE = {
  email: '',
  nome: '',
  score: 0,
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
  default:
    return state;
  }
};

export default user;
