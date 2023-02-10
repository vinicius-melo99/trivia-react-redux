import { SALVA_TOKEN } from '../actions';

const INITIAL_STATE = {
  game: {
    ranking: [],
    token: '',
  },
};
const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SALVA_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default game;
