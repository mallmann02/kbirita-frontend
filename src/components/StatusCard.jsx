import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
} from '@mui/material';
import socketInstance from '../utils/socketInstance';

const socket = socketInstance();

function StatusCard({ initialStatus, id, testid }) {
  const [status, setStatus] = useState(initialStatus);

  socket.on('changeStatus', ({ newStatus, idToChange }) => {
    if (idToChange === id) setStatus(newStatus);
  });

  const colorStatus = {
    Pendente: '#ffcc00',
    Preparando: '#99cc00',
    Entregue: '#00cc99',
  };
  return (
    <Box
      sx={ {
        backgroundColor: colorStatus[status],
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '5px',
      } }
    >
      <Typography
        color="text.secondary"
        textAlign="center"
        data-testid={ testid }
        variant="h3"
      >
        {status}
      </Typography>
    </Box>

  );
}

StatusCard.propTypes = {
  initialStatus: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  testid: PropTypes.string.isRequired,
};

export default StatusCard;
