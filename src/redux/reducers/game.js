import {
  FETCH_TOKEN,
  FETCH_SUCESSO,
  FETCH_ERRO,
} from '../actions';

const INITIAL_STATE = {
  game: {
    ranking: [],
    token: '',
    loading: false,
  },
};
const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case FETCH_SUCESSO:
    return {
      ...state,
      loading: false,
      token: action.payload,
    };
  case FETCH_ERRO:
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default game;
