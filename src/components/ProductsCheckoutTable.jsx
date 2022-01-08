import React from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Delete } from '@mui/icons-material';

function ProductsCheckoutTable({ checkoutCart, setCheckoutCart }) {
  const rows = checkoutCart.map((cart, index) => (
    { ...cart, productId: cart.id, id: index }));
  const formatValue = (value) => (
    `${parseFloat(value.toString()).toFixed(2).replace('.', ',')}`
  );

  function getSubTotal(params) {
    const unitPrice = params.getValue(params.id, 'price');
    const totalQuantity = params.getValue(params.id, 'quantity');
    return formatValue(unitPrice * totalQuantity);
  }

  function handleDeleteCartItem(params) {
    setCheckoutCart(checkoutCart
      .filter((product) => product.id !== params.row.productId));
  }

  const tableColumns = [
    {
      field: 'id',
      headerName: 'Item',
      flex: 0.25,
      type: 'number',
      renderCell: (params) => (
        <span
          data-testid={
            `customer_checkout__element-order-table-item-number-${params.id}`
          }
        >
          {params.value + 1}
        </span>),
    },
    {
      field: 'name',
      headerName: 'Descrição',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => (
        <span
          data-testid={ `customer_checkout__element-order-table-name-${params.id}` }
        >
          {params.value}
        </span>),
    },
    {
      field: 'quantity',
      headerName: 'Quantidade',
      type: 'number',
      flex: 0.25,
      renderCell: (params) => (
        <span
          data-testid={
            `customer_checkout__element-order-table-quantity-${params.id}`
          }
        >
          {params.value}
        </span>),
    },
    {
      field: 'price',
      headerName: 'Valor Unitário',
      flex: 0.25,
      type: 'number',
      renderCell: (params) => (
        <span
          data-testid={
            `customer_checkout__element-order-table-unit-price-${params.id}`
          }
        >
          {formatValue(params.value)}
        </span>),
    },
    {
      field: 'subtotal',
      headerName: 'SubTotal',
      flex: 0.25,
      valueGetter: getSubTotal,
      renderCell: (params) => (
        <span
          data-testid={
            `customer_checkout__element-order-table-sub-total-${params.id}`
          }
        >
          {params.value}
        </span>),
    },
    {
      field: 'actions',
      type: 'actions',
      width: 90,
      renderCell: (params) => (
        <button
          type="button"
          onClick={ () => handleDeleteCartItem(params) }
          data-testid={
            `customer_checkout__element-order-table-remove-${params.id}`
          }
        >
          <Delete />
        </button>),
    },
  ];
  return (
    <div
      style={ {
        width: '100%',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 400,
      } }
    >
      <DataGrid
        rows={ rows }
        columns={ tableColumns }
        pageSize={ 11 }
        // autoHeight
        disableSelectionOnClick
        disableMultipleSelection
        disableColumnMenu
        rowHeight={ 35 }
      />
    </div>
  );
}

export default ProductsCheckoutTable;

ProductsCheckoutTable.propTypes = {
  checkoutCart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    quantity: PropTypes.number,
    value: PropTypes.number,
  })),
  setCheckoutCart: PropTypes.func,
}.isRequired;
