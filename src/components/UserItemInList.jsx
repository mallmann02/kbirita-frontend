import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';

const testIdsPrefix = 'admin_manage__';

function UserItemInList(props) {
  const {
    id,
    name,
    role,
    email,
    itemIndex,
    removeUser,
  } = props;

  const typographyTextStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return (
    <Box
      sx={ {
        backgroundColor: '#E5E5E5',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '2px',
      } }
    >
      <Typography
        sx={ {
          color: '#000',
          backgroundColor: '#2FC18C',
          width: '5%',
          textAlign: 'center',
          ...typographyTextStyle,
        } }
        data-testid={ `${testIdsPrefix}element-user-table-item-number-${id}` }
      >
        { itemIndex }
      </Typography>
      <Typography
        sx={ { color: '#000', width: '25%', marginLeft: '5px', ...typographyTextStyle } }
        data-testid={ `${testIdsPrefix}element-user-table-name-${id}` }
      >
        { name }
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#036B52',
          width: '30%',
          textAlign: 'center',
          ...typographyTextStyle,
        } }
        data-testid={ `${testIdsPrefix}element-user-table-email-${id}` }
      >
        { email }
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#421981',
          width: '30%',
          textAlign: 'center',
          ...typographyTextStyle,
          textTransform: 'capitalize',
        } }
        data-testid={ `${testIdsPrefix}element-user-table-role-${id}` }
      >
        { role }
      </Typography>
      <Button
        sx={ {
          color: '#FFF',
          backgroundColor: '#056CF9',
          width: '10%',
          textAlign: 'center',
          textTransform: 'none',
          borderRadius: '0',
        } }
        data-testid={ `${testIdsPrefix}element-user-table-remove--${id}` }
        onClick={ () => removeUser(id) }
      >
        Remover
      </Button>
    </Box>
  );
}

UserItemInList.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  itemIndex: PropTypes.number.isRequired,
  removeUser: PropTypes.func.isRequired,
};

export default UserItemInList;
