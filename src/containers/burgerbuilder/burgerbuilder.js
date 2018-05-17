import React, { Component } from 'react';
import Burger from '../../components/burger/burger'
import BuildControls from '../../components/burger/buildcontrols/buildcontrols'
import Modal from '../../components/ui/modal/modal'
import OrderSummary from '../../components/burger/ordersummary/ordersummary'
import Spinner from '../../components/ui/spinner/spinner'
import enableErrorCatching from '../../components/catcherrors/catcherrors'
import axiosOrder from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store//actions/actions'

export class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
        sendingOrder: false
    }
    
    componentDidMount() {
        this.props.initIngredients()
        //make app think an order was not just sent so going through checkout will
        //not redirect to this page early
        this.props.resetJustSentOrder()
    }

    purchaseHandler = (bool) => {
        this.setState({purchasing: bool})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }
    
    render() {
        if (this.props.ingredientsLoadError) return <p>Ingredient data could not be loaded.</p>
        const ings = this.props.ingredients
        if (!ings) return <Spinner />
        const totalPriceString = this.props.totalPrice.toFixed(2)
        const noIngredients = this.props.totalPrice < 4.001 //accounting for math errors with floats
        const purchasing = this.state.purchasing
        let orderSummaryOrSpinner = <Spinner />
        if (!this.state.sendingOrder) {
            orderSummaryOrSpinner = (
                <OrderSummary
                        ingredients={ings}
                        totalPriceString={totalPriceString}
                        cancelHandler={() => this.purchaseHandler(false)}
                        continueHandler={this.purchaseContinueHandler}
                />
            )
        }
        const isLogedIn = actions.isLoggedIn(this.props.authState)
        return (
            <React.Fragment>
                <Burger
                    ingredients={ings}
                    noIngredients={noIngredients}
                />
                <Modal
                    show={purchasing}
                    backdropClicked={() => this.purchaseHandler(false)}>
                        {orderSummaryOrSpinner}
                    </Modal>
                <BuildControls
                    loggedIn={isLogedIn}
                    ingredients={ings.map(ing => {
                        return {name: ing.name, disableMinus: ing.count <= 0}
                    })}
                    addSubHandler={this.props.addSubIngredientHandler}
                    price={totalPriceString}
                    orderButtonDisabled={noIngredients || !isLogedIn || purchasing}
                    purchaseHandler={() => this.purchaseHandler(true)}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    ingredientsLoadError: state.burger.ingredientsLoadError,
    orderJustSent: state.order.orderJustSent,
    authState: state.auth
})

const mapDispatchToProps = dispatch => ({
    addSubIngredientHandler: (name, willAdd) => {
        dispatch(actions.addSubIngredient(name, willAdd))
    },
    initIngredients: () => dispatch(actions.initIngredients()),
    resetJustSentOrder: () => dispatch({type: actions.SET_JUST_SENT, value: false})
})

export default connect(mapStateToProps,mapDispatchToProps)(enableErrorCatching(BurgerBuilder, axiosOrder))