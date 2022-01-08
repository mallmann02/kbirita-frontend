import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

function Input({ label, dataTest, onChange, value }) {
  return (
    <TextField
      autoFocus
      margin="dense"
      label={ label }
      type="text"
      required
      inputProps={ { 'data-testid': dataTest } }
      value={ value }
      onChange={ (e) => onChange(e.target.value) }
    />
  );
}

export default Input;

Input.propTypes = {
  label: PropTypes.string,
  dataTest: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}.isRequired;
