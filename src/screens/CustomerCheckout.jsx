import React, { useContext } from 'react';
import { Box } from '@mui/material';

import DeliveryDetails from '../components/DeliveryDetails';
import ProductsCheckoutTable from '../components/ProductsCheckoutTable';
import ContextProducts from '../context/ContextProducts';
import NavBar from '../components/NavBar';

function CustomerCheckout() {
  const {
    cartProducts,
    calculateSubtotal,
    setCartProducts,
  } = useContext(ContextProducts);

  const flexDisplaySx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  };

  return (
    <>
      <NavBar />
      <Box
        sx={ {
          ...flexDisplaySx,
          flexDirection: 'row',
          marginTop: '50px',
        } }
      >
        <Box
          sx={ {
            ...flexDisplaySx,
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '70%',
          } }
        >
          <ProductsCheckoutTable
            checkoutCart={ cartProducts }
            setCheckoutCart={ setCartProducts }
          />
          <p
            style={ {
              backgroundColor: '#830000',
              padding: '10px',
              borderRadius: '2px',
              color: '#FFF',
              fontSize: '18px',
              fontWeight: '700',
            } }
          >
            R$
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              { ` ${calculateSubtotal(cartProducts).toString().replace('.', ',')}` }
            </span>
          </p>
        </Box>
        <DeliveryDetails />
      </Box>
    </>
  );
}

export default CustomerCheckout;
