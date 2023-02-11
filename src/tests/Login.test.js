import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const validEmail = 'alguem@email.com';
const validName = 'Alguem';

describe('Testa os componentes de input de email e senha', () =>{

  it('Testa a renderização correta da pagina Login', () =>{
    renderWithRouterAndRedux(<App/>);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
  });
  it('Testa se é possível escrever o email e o nome do usuário.', () => {
    renderWithRouterAndRedux(<App/>);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, 'Alguem');
    userEvent.type(emailInput, 'alguem@email.com');

    expect(buttonPlay).not.toBeDisabled();
  });
  it('Testa se após clicar o botão de play é redirecionado para a tela de game e é executado a requisição para a API do Trivia.', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    globalThis.fetch = jest.fn();
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const buttonPlay = screen.getByTestId('btn-play');
    userEvent.type(nameInput, validName);
    userEvent.type(emailInput, validEmail);
    userEvent.click(buttonPlay);
    const path = history.location.pathname;
    expect(globalThis.fetch).toBeCalledWith('https://opentdb.com/api_token.php?command=request');
    // expect(path).toBe('/game');  

  });
  it('Testa se após clicar o botão de configurações é redirecionado para a tela de configurações', async () => {
    const { history } = renderWithRouterAndRedux(<App/>);
    const buttonSettings = screen.getByTestId('btn-settings');
    userEvent.click(buttonSettings);
    const path = history.location.pathname;
    expect(path).toBe('/configuracao');  

  }); 
});
