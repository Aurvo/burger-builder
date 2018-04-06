import React, { Component } from 'react';
import Layout from './components/layout/layout'
import BurgerBuilder from './containers/burgerbuilder/burgerbuilder'
import Checkout from './containers/checkout/checkout'
import Orders from './containers/orders/orders'
import { Route, Switch, Redirect } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/burgerbuilder" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Redirect from="/" to="/burgerbuilder"/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
