import React, { Component } from 'react';
import Layout from './components/layout/layout'
import BurgerBuilder from './containers/burgerbuilder/burgerbuilder'

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}

export default App;
