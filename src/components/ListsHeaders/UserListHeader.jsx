import React from 'react';
import {
  Typography,
  Box,
} from '@mui/material';

function UserListHeader() {
  return (
    <Box
      sx={ {
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '2px',
        marginBottom: '20px',
      } }
    >
      <Typography
        sx={ {
          color: '#000',
          backgroundColor: '#2FC18C',
          width: '5%',
          textAlign: 'center',
          fontWeight: '700',
        } }
      >
        Item
      </Typography>
      <Typography
        sx={ {
          color: '#000',
          backgroundColor: '#E5E5E5',
          width: '25%',
          textAlign: 'center',
          fontWeight: '700',
        } }
      >
        Nome
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#036B52',
          width: '30%',
          textAlign: 'center',
          fontWeight: '700',
        } }
      >
        E-mail
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#421981',
          width: '30%',
          textAlign: 'center',
          fontWeight: '700',
        } }
      >
        Cargo
      </Typography>
    </Box>
  );
}

export default UserListHeader;
