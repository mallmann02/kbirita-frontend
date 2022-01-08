import React, { useState } from 'react';
import {
  Typography,
  Container,
  Box,
  Button,
  NativeSelect,
  TextField,
} from '@mui/material';
import { verifyUserExistance } from '../utils/LocalStorageFunctions';

const existingRoles = ['seller', 'administrator', 'customer'];
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const MINPASSWORDLENGTH = 6;
const MINNAMELENGTH = 12;
const axios = require('axios').default;

const urlBase = process.env.REACT_APP_API_BASE_URL;

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [isCreated, setIsCreated] = useState(false);
  const [invalidRegister, setInvalidRegister] = useState(false);
  const user = verifyUserExistance();
  const { token } = user;

  const validateEmail = () => emailRegex.test(email);

  const validatePassword = () => password.length >= MINPASSWORDLENGTH;

  const validateName = () => name.length >= MINNAMELENGTH;

  const validateLoginInputs = () => (
    validateEmail() && validatePassword() && validateName());

  async function handleCreateNewUSer() {
    setIsCreated(false);
    setInvalidRegister(false);
    const data = { name, email, password, role };
    const payload = JSON.stringify(data);
    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    try {
      await axios.post(`${urlBase}/register`, payload, config);
      setIsCreated(true);
    } catch (e) {
      setInvalidRegister(true);
    }
  }
  return (
    <Container
      component="div"
      maxWidth="lg"
      sx={ { marginTop: 3 } }
    >
      <Typography variant="h5">
        Criar usuário
      </Typography>
      <Box
        sx={ {
          display: 'flex',
          justifyContent: 'space-between',
        } }
        component="div"
      >
        <TextField
          margin="dense"
          label="Nome"
          inputProps={ { 'data-testid': 'admin_manage__input-name' } }
          onChange={ (e) => setName(e.target.value) }
          value={ name }
          required
          error={ !validateName() }
          helperText={ !validatePassword()
          && 'O nome tem que ter no mínimo 12 caracteres' }
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          inputProps={ { 'data-testid': 'admin_manage__input-email' } }
          onChange={ (e) => setEmail(e.target.value) }
          value={ email }
          required
          error={ !validateEmail() }
          helperText={ !validateEmail()
          && 'Tem que ser um email válido' }
        />
        <TextField
          margin="dense"
          label="Senha"
          inputProps={ { 'data-testid': 'admin_manage__input-password' } }
          type="password"
          onChange={ (e) => setPassword(e.target.value) }
          value={ password }
          required
          error={ !validatePassword() }
          helperText={ !validatePassword()
          && 'O nome tem que ter no mínimo 6 caracteres' }
        />
        <NativeSelect
          inputProps={ { 'data-testid': 'admin_manage__select-role' } }
          onChange={ (e) => setRole(e.target.value) }
          required
        >
          {existingRoles
            .map((item) => <option key={ item } value={ item }>{item}</option>)}
        </NativeSelect>
        <Button
          disabled={ !validateLoginInputs() }
          data-testid="admin_manage__button-register"
          onClick={ () => handleCreateNewUSer() }
        >
          Criar
        </Button>
      </Box>
      { isCreated && 'Usuario criado' }
      { invalidRegister
        && (
          <span
            data-testid="admin_manage__element-invalid-register"
          >
            Por favor crie um usuário válido

          </span>) }
    </Container>
  );
}

export default CreateUser;
