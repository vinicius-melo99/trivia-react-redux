// ACTIONS TYPES
export const SALVA_EMAIL = 'ADICIONA_EMAIL';
export const SALVA_NOME = 'ADICIONA_NOME';
export const SALVA_TOKEN = 'ADICIONA_TOKEN';

// CONSTS
const ENDPOINT_TOKE = 'https://opentdb.com/api_token.php?command=request';

// ACTIONS CREATORS
export const adicionaEmail = (email) => ({
  type: SALVA_EMAIL,
  payload: email,
});

export const adicionaNome = (nome) => ({
  type: SALVA_NOME,
  payload: nome,
});

export const salvaToken = (token) => ({
  type: SALVA_TOKEN,
  payload: token,
});

export const solicitaToken = () => async (dispatch) => {
  const result = await fetch(ENDPOINT_TOKE);
  const data = await result.json();
  return dispatch(salvaToken(data.token));
};
