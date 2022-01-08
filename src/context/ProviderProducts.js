import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextProducts from './ContextProducts';
// import { verifyUserExistance } from '../utils/LocalStorageFunctions';
import getServerUrl from '../utils/getServerUrl';

const axios = require('axios').default;

function ProviderProducts({ children }) {
  const [allProducts, setAllProducts] = useState([{}]);
  const [cartProducts, setCartProducts] = useState([{}]);
  // const [subtotal, setSubtotal] = useState(0);
  const urlBase = getServerUrl();

  const findProducts = async () => {
    const { data: { products } } = await axios.get(`${urlBase}/products`);
    console.log(products);
    setAllProducts(products);
    return products;
  };

  const findSpecificProduct = async (id) => {
    const { data: product } = await axios.get(`${urlBase}/products/${id}`);
    return product;
  };

  const calculateSubtotal = (cart) => {
    const total = cart
      .reduce((tot, curr) => {
        if (curr.quantity === 0) {
          return tot + (+(curr.price) * 1);
        }
        return tot + (+(curr.price) * curr.quantity);
      }, 0);

    return total.toFixed(2);
  };

  const setProductCartQuantity = async (id, quantity) => {
    if (quantity === 0) {
      setCartProducts(cartProducts.filter((product) => product.id !== id));
      return;
    }

    const productInCart = cartProducts.find((product) => product.id === id);

    if (productInCart) {
      setCartProducts(cartProducts
        .map((p) => {
          if (p.id === id) p.quantity = quantity;
          return p;
        }));
      return;
    }

    if (!id) return;

    const product = await findSpecificProduct(id);

    setCartProducts([...cartProducts, { ...product, quantity, id }]);
  };

  return (
    <ContextProducts.Provider
      value={ {
        findProducts,
        allProducts,
        cartProducts,
        setProductCartQuantity,
        calculateSubtotal,
        setCartProducts,
      } }
    >
      {children}
    </ContextProducts.Provider>
  );
}

ProviderProducts.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderProducts;
