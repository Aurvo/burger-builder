import React, { Component } from 'react'
import Order from '../../components/order/order/order'
import Spinner from '../../components/ui/spinner/spinner'
import catchErrors from '../../components/catcherrors/catcherrors'
import axiosOrder from '../../axios-orders'
import { connect } from 'react-redux'
import { SSL_OP_PKCS1_CHECK_1 } from 'constants';

class Orders extends Component {
    state = {
        orders: null,
        error: false
    }

   componentDidMount() {
        const queryParams = 'auth='+this.props.token+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
        axiosOrder.get('/orders.json?' + queryParams)
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
            if (ordersOrSpinner.length < 1)
                ordersOrSpinner = <p>You have no pending orders. Go to the Burger Builder page to begin making some.</p>
        } else {
            ordersOrSpinner = <Spinner />
        }
        return (
            <React.Fragment>
                <h1 style={{textAlign: 'center'}}>My Orders:</h1>
                <div>
                    {ordersOrSpinner}
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    userId: state.auth.userId
})

export default connect(mapStateToProps)(catchErrors(Orders, axiosOrder))