import React from 'react';
import {
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

function OrderDetails({ data }) {
  return (
    <div>
      <span
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {`Pedido 00${data.id}`}
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {data.saleDate}
      </span>
      <span
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {data.status}
      </span>
      <Button
        data-testid="seller_order_details__button-preparing-check"
      >
        Preparar Pedido
      </Button>
      <Button
        data-testid="seller_order_details__button-dispatch-check"
      >
        Saiu para entrega
      </Button>
    </div>
  );
}

export default OrderDetails;

OrderDetails.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    sellerId: PropTypes.number,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    userId: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      price: PropTypes.string,
      urlImage: PropTypes.string,
    })),
  }),
}.isRequired;
