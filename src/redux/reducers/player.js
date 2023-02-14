import {
  SALVA_ACERTOS,
  SALVA_PLACAR,
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
  default:
    return state;
  }
};

export default player;
