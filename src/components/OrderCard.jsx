import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import StatusCard from './StatusCard';

import convertDateFormat from '../utils/convertDateFormat';

function OrderCard(props) {
  const { id, saleDate, status, totalPrice } = props;
  // const contentText = (content, testeid = '') => (
  //   <Typography
  //     sx={ { fontSize: 14 } }
  //     color="text.secondary"
  //     data-testid={ testeid }
  //     variant="h4"
  //   >
  //     {content}
  //   </Typography>
  // );
  // const rightBox = (content, testid = '') => (
  //   <Grid item xs={ 5 }>
  //     {contentText(content, testid)}
  //   </Grid>
  // );
  const charQuantity = 4;
  // const orderNumberBox = (
  //   <Grid container direction="column" alignItems="center" justifyContent="space-between">
  //     <Grid item xs={ 5 }>
  //       {contentText('Pedido')}
  //     </Grid>
  //     <Grid item xs={ 5 } data-testid={ `customer_orders__element-order-id-${id}` }>
  //       {contentText(id.toString().padStart(charQuantity, '0'))}
  //     </Grid>
  //   </Grid>
  // );
  const dateTestid = `customer_orders__element-order-date-${id}`;
  const priceTestid = `customer_orders__element-card-price-${id}`;
  const statusTestid = `customer_orders__element-delivery-status-${id}`;
  return (
    // <Card sx={ { maxWidth: 350 } }>
    //   <Grid container direction="row" alignItems="center" justifyContent="stretch">
    //     <Grid
    //       item
    //       xd={ 2 }
    //       sx={ { height: '100%' } }
    //     >
    //       {orderNumberBox}
    //     </Grid>
    //     <Grid item xs={ 3 }>
    //       <Grid container direction="row">
    //         <StatusCard initialStatus={ status } id={ id } testid={ statusTestid } />
    //         <Grid
    //           container
    //           direction="column"
    //           alignItems="center"
    //           justifyContent="space-around"
    //         >
    //           {rightBox(convertDateFormat(saleDate), dateTestid)}
    //           {rightBox(`R$ ${totalPrice.replace('.', ',')}`, priceTestid)}
    //         </Grid>
    //       </Grid>
    //     </Grid>
    //   </Grid>
    // </Card>
    <Box
      sx={ {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#e5e5e5',
        padding: '5px',
        gap: '5px',
        borderRadius: '10px',
      } }
    >
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFF',
          borderRadius: '5px',
          padding: '5px',
        } }
      >
        <p>Pedido</p>
        <Button
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          { id.toString().padStart(charQuantity, '0') }
        </Button>
      </Box>
      <Box
        sx={ {
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
        } }
      >
        <StatusCard
          initialStatus={ status }
          id={ id }
          testid={ statusTestid }
        />
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '5px',
            fontWeight: 'bold',
            width: '50%',
          } }
        >
          <Typography
            data-testid={ dateTestid }
            sx={ {
              height: '50%',
              fontWeight: 'inherit',
              width: '100%',
              backgroundColor: '#F2FFFC',
              borderRadius: '2px',
              textAlign: 'center',
            } }
          >
            { convertDateFormat(saleDate) }
          </Typography>

          <Typography
            data-testid={ priceTestid }
            sx={ {
              height: '50%',
              fontWeight: 'inherit',
              width: '100%',
              backgroundColor: '#F2FFFC',
              borderRadius: '2px',
              textAlign: 'center',
            } }
          >
            { `R$ ${totalPrice.replace('.', ',')}` }
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
};

export default OrderCard;
