import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import NavBar from '../components/NavBar';
import SellerViewOrderCard from '../components/SellerViewOrderCard';
import { verifyUserExistance } from '../utils/LocalStorageFunctions';

function SellerOrders() {
  const gridStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
    marginLeft: 5,
  };

  const [sales, setSales] = useState();
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const user = verifyUserExistance();
  const { token } = user;

  useEffect(() => {
    async function getSales() {
      const headers = { Authorization: token };
      const { data } = await axios
        .get(`${apiBaseUrl}/sales`, { headers });
      setSales(data.sales);
    }
    getSales();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <NavBar sellerView />

      { sales && (
        <Grid sx={ gridStyle }>
          { sales.map((sale, index) => {
            const {
              id,
              status,
              totalPrice,
              deliveryAddress,
              deliveryNumber,
              saleDate,
            } = sale;

            const saleProps = {
              id,
              status,
              totalPrice,
              deliveryAddress,
              deliveryNumber,
              saleDate,
            };

            return <SellerViewOrderCard { ...saleProps } key={ index } />;
          }) }
        </Grid>) }
    </div>
  );
}

export default SellerOrders;
