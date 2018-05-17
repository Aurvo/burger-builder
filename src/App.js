import React, { Component } from 'react';
import Layout from './components/layout/layout'
import BurgerBuilder from './containers/burgerbuilder/burgerbuilder'
import Checkout from './containers/checkout/checkout'
import Orders from './containers/orders/orders'
import Auth from './containers/auth/auth'
import LogOut from './containers/auth/logout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { isLoggedIn } from './store/actions/actions'

class App extends Component {
  render() {
    const userLoggedIn = isLoggedIn(this.props.authState)
    return (
      <Layout>
        <Switch>
          <Route path="/burgerbuilder" component={BurgerBuilder}/>
          {userLoggedIn ? <Route path="/checkout" component={Checkout}/> : null}
          {userLoggedIn ? <Route path="/orders" component={Orders}/> : null}
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={LogOut}/>
          <Redirect from="/" to="/burgerbuilder"/>
        </Switch>
      </Layout>
    );
  }
}

const mapStateTorops = (state) => ({
  authState: state.auth
})

export default withRouter(connect(mapStateTorops)(App))
