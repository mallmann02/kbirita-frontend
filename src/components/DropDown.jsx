import React from 'react';
import {
  FormControl,
  NativeSelect,
} from '@mui/material';
import PropTypes from 'prop-types';

function DropDown({ items, dataTest, onChange }) {
  return (
    <FormControl
      variant="outlined"
      sx={ { m: 1, minWidth: 200 } }
    >
      <NativeSelect
        inputProps={ { 'data-testid': dataTest } }
        onChange={ (e) => onChange(e.target.value) }
      >
        <option value="">Escolha o vendedor</option>
        {items.map(([id, name]) => <option key={ id } value={ id }>{name}</option>)}
      </NativeSelect>
    </FormControl>
  );
}

export default DropDown;

DropDown.propTypes = {
  items: PropTypes.array,
  dataTest: PropTypes.string,
  onChange: PropTypes.string,
  value: PropTypes.string,
}.isRequired;
