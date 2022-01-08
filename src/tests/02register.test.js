import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
// import renderWithRouter from './renderWithRouter';
import ContextLogin from '../context/ContextLogin';
import ProviderLogin from '../context/ProviderLogin';
import SignUp from '../screens/SingUp';
import axios from 'axios';

const name = 'Carlos Silva e Silva';
const email = 'carlos@email.com';
const password = '123456';
const message = 'User Carlos Silva e Silva created';
const NAME_TEST_ID = 'common_register__input-name'
const EMAIL_TEST_ID = 'common_register__input-email';
const PASSWORD_TEST_ID = 'common_register__input-password';
const BUTTON_REGISTER_TEST_ID = 'common_register__button-register';

jest
.spyOn(axios, 'post')
.mockImplementation(() => Promise.resolve({ status: 201, statusText: 'created', data: message }))

const renderWithContext = (
  component) => {
  return {
    ...render(
        <ProviderLogin value={ContextLogin}>
            {component}
        </ProviderLogin>)
  }
}

describe('02 - Teste da pagina de criacao de usuario', () => {
  beforeEach(cleanup);
  
  it('Renderiza os itens corretos', () => {
    renderWithContext(<SignUp />);

    // const { history } = renderWithRouter(<outra />);
    // history.push('/rota');
    
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen. getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(BUTTON_REGISTER_TEST_ID);
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
    expect(registerButton).toBeDisabled();
  });

  it('Botao de cadastrar habilitado ao entrar com dados validos', () => {
    renderWithContext(<SignUp />);
    
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen. getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(BUTTON_REGISTER_TEST_ID);
  
    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
  
    expect(registerButton).not.toBeDisabled();
  });

  it('Botao de cadastrar desabilitado ao entrar com nome invalido', () => {
    renderWithContext(<SignUp />);
    
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen. getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(BUTTON_REGISTER_TEST_ID);

    fireEvent.change(nameInput, { target: { value: 'carlos' } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(registerButton).toBeDisabled();
  });

  it('Botao de cadastrar desabilitado ao entrar com email invalido', () => {
    renderWithContext(<SignUp />);
    
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen. getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(BUTTON_REGISTER_TEST_ID);

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: 'email@email' } });
    fireEvent.change(passwordInput, { target: { value: password } });

    expect(registerButton).toBeDisabled();
  });

  it('Botao de cadastrar desabilitado ao entrar com senha invalida', () => {
    renderWithContext(<SignUp />);
    
    const nameInput = screen.getByTestId(NAME_TEST_ID);
    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen. getByTestId(PASSWORD_TEST_ID);
    const registerButton = screen.getByTestId(BUTTON_REGISTER_TEST_ID);

    fireEvent.change(nameInput, { target: { value: name } });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: '1234' } });

    expect(registerButton).toBeDisabled();
  });
});
