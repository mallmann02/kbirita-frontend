import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProviderLogin from './context/ProviderLogin';
import ProviderProducts from './context/ProviderProducts';
import SignUp from './screens/SingUp';
import Login from './screens/Login';
import CustomerProducts from './screens/CustomerProducts';
import CustomerCheckout from './screens/CustomerCheckout';
import CustomerOrders from './screens/CustomerOrders';
import CustomerOrdersDetails from './screens/CustomerOrdersDetails';
import SellerOrders from './screens/SellerOrders';
import SellerOrdersDetails from './screens/SellerOrdersDetails';
import AdminManage from './screens/AdminManage';
import NotFound from './screens/NotFound';

function App() {
  return (
    <BrowserRouter>
      <ProviderProducts>
        <ProviderLogin>
          <Switch>
            <Route exact path="/" render={ () => <Redirect to="/login" /> } />
            <Route exact path="/login" component={ Login } />
            <Route exact path="/register" component={ SignUp } />
            <Route exact path="/customer/products" component={ CustomerProducts } />
            <Route exact path="/customer/checkout" component={ CustomerCheckout } />
            <Route exact path="/customer/orders" component={ CustomerOrders } />
            <Route
              exact
              path="/customer/orders/:id"
              component={ CustomerOrdersDetails }
            />
            <Route exact path="/seller/orders" component={ SellerOrders } />
            <Route exact path="/seller/orders/:id" component={ SellerOrdersDetails } />
            <Route exact path="/admin/manage" component={ AdminManage } />
            <Route component={ NotFound } />
          </Switch>
        </ProviderLogin>
      </ProviderProducts>
    </BrowserRouter>
  );
}

export default App;
