import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Box, TextField, Button, Link } from '@mui/material';
import ContextLogin from '../context/ContextLogin';
import { verifyUserExistance } from '../utils/LocalStorageFunctions';

function Login() {
  const { makeLogin, invalidEmailError } = useContext(ContextLogin);
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  const MINPASSWORDLENGTH = 6;

  const validateEmail = () => emailRegex.test(email);

  const validatePassword = () => password.length >= MINPASSWORDLENGTH;

  const validateLoginInputs = () => validateEmail() && validatePassword();

  useEffect(() => {
    const user = verifyUserExistance();
    if (user) {
      switch (user.role.toLowerCase()) {
      case 'administrator':
        history.push('/admin/manage');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      default:
        history.push('/customer/products');
        break;
      }
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async () => {
    const response = await makeLogin(email, password);
    const { role } = verifyUserExistance();
    if (response) {
      switch (role.toLowerCase()) {
      case 'administrator':
        history.push('/admin/manage');
        break;
      case 'seller':
        history.push('/seller/orders');
        break;
      default:
        history.push('/customer/products');
        break;
      }
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
        fontFamily: 'Poppins',
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          width: '20%',
          height: '45%',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 5px #000',
          borderRadius: '2px',
        } }
      >
        <TextField
          margin="dense"
          label="Email"
          type="email"
          name="email"
          variant="standard"
          required
          InputLabelProps={ { style: { fontSize: '18px' } } }
          sx={ { marginBottom: '15px', width: '70%' } }
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          error={ !validateEmail() }
          helperText={ !(validateEmail()) && 'Digite um email válido' }
          inputProps={ {
            'data-testid': 'common_login__input-email',
            style: {
              fontSize: '16px',
              height: '35px',
              borderRadius: '2px',
              padding: '0 5px',
            },
          } }
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          name="password"
          variant="standard"
          required
          InputLabelProps={ { sx: { fontSize: '18px' } } }
          sx={ { width: '70%' } }
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          error={ !validatePassword() }
          helperText={ !validatePassword()
            && 'A senha tem que ter mais que 6 caracteres' }
          inputProps={ {
            'data-testid': 'common_login__input-password',
            style: {
              fontSize: '16px',
              height: '35px',
              borderRadius: '2px',
              padding: '0 5px',
            },
          } }
        />
        <Button
          disabled={ !validateLoginInputs() }
          onClick={ handleLogin }
          data-testid="common_login__button-login"
          sx={ { textTransform: 'none', marginTop: '20px' } }
        >
          Login
        </Button>
        <Button
          data-testid="common_login__button-register"
          sx={ { textTransform: 'none' } }
        >
          <Link
            href="/register"
            underline="none"
          >
            Criar conta
          </Link>
        </Button>
      </Box>

      {invalidEmailError && (
        <span
          data-testid="common_login__element-invalid-email"
        >
          Email ou senha inválida
        </span>
      )}
    </Box>
  );
}

export default Login;
