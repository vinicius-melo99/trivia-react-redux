import {
  SALVA_ACERTOS,
  SALVA_PLACAR,
  FAZ_LOGOUT,
} from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALVA_PLACAR:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case SALVA_ACERTOS:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case FAZ_LOGOUT:
    return {
      ...INITIAL_STATE,
    };
  default:
    return state;
  }
};

export default player;
