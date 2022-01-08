import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { logoutUser, verifyUserExistance } from '../utils/LocalStorageFunctions';

function NavBar({ sellerView = false }) {
  const user = verifyUserExistance();
  const { name } = user;
  const history = useHistory();
  return (
    <AppBar position="static">
      <Toolbar
        sx={ {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
        } }
        component="nav"
      >
        { !sellerView && (
          <Link
            style={ { textDecoration: 'none', color: 'white' } }
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Produtos
          </Link>) }
        <Link
          style={ { textDecoration: 'none', color: 'white' } }
          to={ sellerView ? '/seller/orders' : '/customer/orders' }
          data-testid="customer_products__element-navbar-link-orders"
        >
          { sellerView ? 'Pedidos' : 'Meus Pedidos' }
        </Link>
        <Typography
          variant="h6"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </Typography>
        <Button
          color="inherit"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => {
            logoutUser();
            history.push('/login');
          } }
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  sellerView: PropTypes.bool,
};

NavBar.defaultProps = {
  sellerView: false,
};

export default NavBar;
