import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Grid } from '@mui/material';
import BackgroundContainer from '../components/BackgroundContainer';
import { verifyUserExistance } from '../utils/LocalStorageFunctions';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';

const getUrlServer = require('../utils/getServerUrl');

function CustomerOrders() {
  const [clientOrders, setClientOrders] = useState([]);
  const user = verifyUserExistance();
  const history = useHistory();
  if (!user) history.push('/login');
  const { token } = user;
  useEffect(() => {
    const getClientOrders = async (userToken) => {
      const headers = { Authorization: userToken };
      const orders = await axios.get(`${getUrlServer()}/sales`, { headers });
      return orders;
    };
    getClientOrders(token)
      .then((response) => {
        setClientOrders(response.data.sales);
      })
      .catch((e) => console.log(e.message));
  // eslint-disable-next-line
  }, []);
  return (
    <BackgroundContainer>
      <NavBar />
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap
        sx={ { padding: '30px', width: '100%' } }
        spacing={ 2 }
      >
        {
          clientOrders.map((order, index) => {
            const { id, saleDate, totalPrice, status } = order;
            return (
              <Grid
                item
                xs={ 2 }
                key={ index }
                onClick={ () => history.push(`/customer/orders/${id}`) }
              >
                <OrderCard
                  id={ id }
                  saleDate={ saleDate }
                  status={ status }
                  totalPrice={ totalPrice }
                />
              </Grid>
            );
          })
        }
      </Grid>
    </BackgroundContainer>
  );
}

export default CustomerOrders;
