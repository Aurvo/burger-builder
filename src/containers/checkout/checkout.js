import React , { Component } from 'react'
import CheckoutSummary from '../../components/order/checkout/checkoutsummary'
import ContactData from './contactdata/contactdata'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

class Checkout extends Component {
    cancleHandler = () => {
        this.props.history.goBack()
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {        
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    cancelHandler={this.cancleHandler}
                    continueHandler={this.continueHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({ingredients: state.ingredients})

export default connect(mapStateToProps)(Checkout)