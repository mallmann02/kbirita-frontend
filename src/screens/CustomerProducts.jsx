import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  Button,
  Box,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import BackgroundContainer from '../components/BackgroundContainer';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import ContextProducts from '../context/ContextProducts';

function CustomerProducts() {
  const gridStyle = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 5,
    marginLeft: 5,
  };

  const {
    findProducts,
    allProducts: products,
    cartProducts,
    calculateSubtotal,
  } = useContext(ContextProducts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      await findProducts();
      setLoading(false);
    }
    getProducts(); // eslint-disable-next-line
  }, []);

  const renderProductCard = () => products.map((product, index) => (
    <ProductCard key={ index } { ...product } />
  ));

  return (
    <BackgroundContainer>
      <NavBar />

      { loading
        ? <p>Loading</p>
        : <Grid sx={ gridStyle }>{ renderProductCard() }</Grid> }

      <Button
        disabled={ cartProducts.length === 0 }
        data-testid="customer_products__button-cart"
        sx={ {
          backgroundColor: '#830000',
          textDecoration: 'none',
          color: 'white',
          position: 'absolute',
          bottom: '25px',
          right: '25px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          ':hover': {
            opacity: 0.9,
            bottom: '28px',
            backgroundColor: '#830000',
          },
        } }
      >
        <Box
          sx={ {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '5px',
            maxHeight: '25px',
          } }
        >
          <p> R$ </p>
          <Link
            to="/customer/checkout"
            data-testid="customer_products__checkout-bottom-value"
            style={ { textDecoration: 'none', color: 'inherit' } }
          >
            { calculateSubtotal(cartProducts).toString().replace('.', ',') }
          </Link>
        </Box>
        <ShoppingCart />
      </Button>
    </BackgroundContainer>
  );
}

export default CustomerProducts;
