import React, { Component } from 'react'
import Order from '../../components/order/order/order'
import Spinner from '../../components/ui/spinner/spinner'
import catchErrors from '../../components/catcherrors/catcherrors'
import axiosOrder from '../../axios-orders'

class Orders extends Component {
    state = {
        orders: null,
        error: false
    }

   componentDidMount() {
    axiosOrder.get('/orders.json')
    .then(res => this.setState({orders: res.data}))
    .catch(err => this.setState({error: true}))
   }
    
    render() {
        if (this.state.error) return <p>There was an error in loading your orders.</p>
        const orders = this.state.orders
        let ordersOrSpinner = null
        if (orders) {
            let order;
            ordersOrSpinner = []
            for (let name in orders) {
                order = orders[name]
                ordersOrSpinner.push(<Order key={name} ingredients={order.ingredients} price={order.price}/>)

            }
        } else {
            ordersOrSpinner = <Spinner />
        }
        return (
            <div>
                {ordersOrSpinner}
            </div>
        )
    }
}

export default catchErrors(Orders, axiosOrder)