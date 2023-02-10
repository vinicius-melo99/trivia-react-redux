// ACTIONS TYPES
export const SALVA_EMAIL = 'ADICIONA_EMAIL';
export const SALVA_NOME = 'ADICIONA_NOME';
export const FETCH_TOKEN = 'SOLICITA_TOKEN';
export const FETCH_SUCESSO = 'SUCESSO_TOKEN';
export const FETCH_ERRO = 'ERRO_TOKEN';
export const SALVA_TOKEN = 'ADICIONA_TOKEN';
export const FAZ_LOGOUT = 'FAZ_LOGOUT';

// CONSTS
const ENDPOINT_TOKEN = 'https://opentdb.com/api_token.php?command=request';

// ACTIONS CREATORS
export const adicionaEmail = (email) => ({
  type: SALVA_EMAIL,
  payload: email,
});

export const adicionaNome = (nome) => ({
  type: SALVA_NOME,
  payload: nome,
});

export const solicitaToken = () => ({
  type: FETCH_TOKEN,
});

export const fetchSucesso = (token) => ({
  type: FETCH_SUCESSO,
  payload: token,
});

export const fetchErro = (error) => ({
  type: FETCH_ERRO,
  payload: error,
});

export const fazLogout = () => ({
  type: FAZ_LOGOUT,
});

export const thunkToken = () => async (dispatch) => {
  try {
    dispatch(solicitaToken());
    const resposta = await fetch(ENDPOINT_TOKEN);
    const arquivo = await resposta.json();
    dispatch(fetchSucesso(arquivo.token));
    return arquivo.token;
  } catch (error) {
    dispatch(fetchErro(error));
  }
};
