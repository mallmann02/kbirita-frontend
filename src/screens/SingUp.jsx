import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button } from '@mui/material';
import ContextLogin from '../context/ContextLogin';
import inputsValidator from '../utils/validateRegisterInputs';

const passwordMinLength = 6;
const nameMinLength = 12;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

function SignUp() {
  const {
    createUser,
    signUpErrorMessage,
  } = useContext(ContextLogin);
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const askCreateUser = async () => {
    const response = await createUser(name, email, password);
    if (response) {
      history.push('/customer/products');
    }
  };

  return (
    <Box
      component="form"
      sx={ {
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
      } }
    >
      <TextField
        label="Nome completo"
        type="text"
        error={ name.length < nameMinLength }
        value={ name }
        onChange={ (e) => setName(e.target.value) }
        required
        margin="dense"
        helperText={
          name.length < nameMinLength && 'Nome deve ter mais de 12 caracteres'
        }
        inputProps={ {
          'data-testid': 'common_register__input-name',
        } }
      />
      <TextField
        label="Email"
        type="text"
        error={ !(emailRegex.test(email)) }
        value={ email }
        onChange={ (e) => setEmail(e.target.value) }
        required
        margin="dense"
        helperText={
          !(emailRegex.test(email)) && 'Email deve ser email@email.com'
        }
        inputProps={ {
          'data-testid': 'common_register__input-email',
        } }
      />
      <TextField
        label="Senha"
        type="text"
        error={ password.length < passwordMinLength }
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        required
        margin="dense"
        helperText={
          password.length < passwordMinLength && 'Senha deve ter mais de 6 digitos'
        }
        inputProps={ {
          'data-testid': 'common_register__input-password',
        } }
      />
      <Button
        disabled={ !inputsValidator({ name, email, password }) }
        onClick={ askCreateUser }
        data-testid="common_register__button-register"
      >
        Cadastrar
      </Button>
      {signUpErrorMessage
        && (
          <span
            className="error_message-span"
            data-testid="common_register__element-invalid_register"
          >
            Usuário já cadastrado com este e-mail
          </span>
        )}
    </Box>
  );
}

export default SignUp;
