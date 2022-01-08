import React from 'react';
import { useHistory } from 'react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
} from '@mui/material';
import { logoutUser, verifyUserExistance } from '../utils/LocalStorageFunctions';

function NavBarAdmin() {
  const { name } = verifyUserExistance();
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
        {/* <Link
          href="/customer/products"
          color="#FFF"
          data-testid="customer_products__element-navbar-link-products"
        >
          Produtos
        </Link> */}
        <Link
          href="/seller/orders"
          color="#FFF"
          data-testid="customer_products__element-navbar-link-orders"
        >
          Pedidos
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

export default NavBarAdmin;
