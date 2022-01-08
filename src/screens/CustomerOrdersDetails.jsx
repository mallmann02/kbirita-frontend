import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import NavBar from '../components/NavBar';
import OrderDetailsDashboard from '../components/OrderDetailsDashboard';

function CustomerOrdersDetails() {
  const [saleInfo, setSaleInfo] = useState();
  const urlBase = `${process.env.REACT_APP_API_BASE_URL}/sales/`;
  const { id: saleId } = useParams();

  useEffect(() => {
    const getSale = async () => {
      const { data: response } = await axios.get(`${urlBase}${saleId}`);
      setSaleInfo(response);
    };
    getSale();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        } }
      >
        <Typography
          sx={ { fontSize: '24px' } }
          color="text.secondary"
          gutterBottom
        >
          Detalhes do Pedido
        </Typography>
        { !saleInfo
          ? <p>Loading</p>
          : <OrderDetailsDashboard { ...saleInfo } /> }
      </Box>
    </>
  );
}

export default CustomerOrdersDetails;
