import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Container,
  Button,
} from '@mui/material';
import convertDateFormat from '../utils/convertDateFormat';
import ProductInSaleCard from './ProductInSaleCard';
import StatusCard from './StatusCard';
import socketInstance from '../utils/socketInstance';

const socket = socketInstance();

const testIdsPrefix = 'customer_order_details__';

function OrderDetailsDashboard(props) {
  const {
    id,
    seller: { name },
    products,
    status: initialStatus,
    totalPrice,
    saleDate,
  } = props;

  const [status, setStatus] = useState(initialStatus);

  const statusTestid = `customer_orders__element-delivery-status-${id}`;

  socket.on('changeStatus', ({ newStatus, idToChange }) => {
    if (idToChange === id) setStatus(newStatus);
  });

  const typographyBasicStyle = {
    fontSize: '16px',
    color: '#000',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px',
  };

  const renderTableHeaders = () => (
    <Box
      sx={ {
        backgroundColor: '#E5E5E5',
        padding: '18px 16px',
        display: 'flex',
        flexDirection: 'row',
        borderRadius: '2px',
        marginTop: '20px',
      } }
    >
      <Typography
        sx={ {
          color: '#000',
          backgroundColor: '#2FC18C',
          width: '5%',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '700',
        } }
        data-testid={ `${testIdsPrefix}element-order-table-item-number-${id}` }
      >
        ID
      </Typography>
      <Typography
        sx={ {
          color: '#000',
          width: '65%',
          marginLeft: '5px',
          fontSize: '16px',
          textAlign: 'center',
          fontWeight: '700',
        } }
        data-testid={ `${testIdsPrefix}element-order-table-name-${id}` }
      >
        Nome do Produto
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#036B52',
          width: '10%',
          textAlign: 'center',
          fontSize: '16px',
          fontWeight: '700',
        } }
        data-testid={ `${testIdsPrefix}element-order-table-quantity-${id}` }
      >
        Quant.
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#421981',
          fontSize: '16px',
          width: '10%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          maxHeight: '35px',
          fontWeight: '700',
        } }
        data-testid={ `${testIdsPrefix}element-order-table-sub-total-${id}` }
      >
        Un.
      </Typography>
      <Typography
        sx={ {
          color: '#FFF',
          backgroundColor: '#056CF9',
          fontSize: '16px',
          width: '10%',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          maxHeight: '35px',
          fontWeight: '700',
        } }
        data-testid={ `${testIdsPrefix}element-order-total-price-${id}` }
      >
        Total
      </Typography>
    </Box>
  );

  return (
    <Container>
      <Box
        sx={ {
          backgroundColor: '#E5E5E5',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '15px',
          justifyContent: 'space-around',
        } }
      >
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-order-id` }
        >
          <p>Pedido</p>
          { id }
        </Typography>
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-seller-name` }
        >
          <p>P.Vend:</p>
          { name }
        </Typography>
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-order-date` }
        >
          { convertDateFormat(saleDate) }
        </Typography>
        <Typography
          sx={ typographyBasicStyle }
          data-testid={ `${testIdsPrefix}element-order-details-label-delivery-status` }
        >
          <StatusCard initialStatus={ status } id={ id } testid={ statusTestid } />
        </Typography>
        <Button
          data-testid={ `${testIdsPrefix}button-delivery-check` }
          disabled={ status !== 'Em Trânsito' }
          onClick={
            () => socket
              .emit('changeStatus', { newStatus: 'Entregue', idToChange: id })
          }
        >
          Marcar com entregue
        </Button>
      </Box>
      <Box>
        { renderTableHeaders() }
        { products
          .map((product, index) => (
            <ProductInSaleCard
              key={ index }
              { ...product }
              testIdsPrefix="customer_order_details__"
            />)) }
      </Box>
      <Box
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '5px',
          width: 'fit-content',
          backgroundColor: '#036B52',
          marginTop: '20px',
          maxHeight: '35px',
          padding: '5px 10px',
          color: 'white',
          fontWeight: '700',
          fontSize: '18px',
        } }
      >
        <p> R$ </p>
        <Typography
          data-testid={ `${testIdsPrefix}element-order-total-price` }
          sx={ { fontSize: '18px', color: 'white', fontWeight: '700' } }
        >
          { totalPrice.replace('.', ',') }
        </Typography>
      </Box>
    </Container>
  );
}

OrderDetailsDashboard.propTypes = {
  id: PropTypes.number.isRequired,
  saleDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  totalPrice: PropTypes.number.isRequired,
  seller: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default OrderDetailsDashboard;
