// ACTIONS TYPES
export const SALVA_EMAIL = 'ADICIONA_EMAIL';
export const SALVA_NOME = 'ADICIONA_NOME';

// ACTIONS CREATORS
export const adicionaEmail = (email) => ({
  type: SALVA_EMAIL,
  payload: email,
});

export const adicionaNome = (nome) => ({
  type: SALVA_NOME,
  payload: nome,
});
