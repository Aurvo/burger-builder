import React , { Component } from 'react'
import CheckoutSummary from '../../components/order/checkout/checkoutsummary'

class Checkout extends Component {
    render() {
        state = {
            ingredietns = [
                {name: 'Salad', count: 1},
                {name: 'Meat', count: 1}
            ]
        }
        
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
            </div>
        )
    }
}

export default Checkout