import {
  FETCH_TOKEN,
  FETCH_TOKEN_SUCESSO,
  FETCH_TOKEN_ERRO,
  FAZ_LOGOUT,
  DESATIVA_BOTOES,
  ATIVA_BOTOES,
} from '../actions';

const INITIAL_STATE = {
  ranking: [],
  token: '',
  loading: false,
  disableButtons: false,
};
const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case FETCH_TOKEN_SUCESSO:
    return {
      ...state,
      loading: false,
      token: action.payload,
    };
  case FETCH_TOKEN_ERRO:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  case DESATIVA_BOTOES:
    return {
      ...state,
      disableButtons: true,
    };
  case ATIVA_BOTOES:
    return {
      ...state,
      disableButtons: false,
    };
  case FAZ_LOGOUT:
    return {
      ranking: [],
      token: '',
      loading: false,
      disableButtons: false,
    };
  default:
    return state;
  }
};

export default game;
