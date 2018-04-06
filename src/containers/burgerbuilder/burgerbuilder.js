import React, { Component } from 'react';
import Burger from '../../components/burger/burger'
import BuildControls from '../../components/burger/buildcontrols/buildcontrols'
import Modal from '../../components/ui/modal/modal'
import OrderSummary from '../../components/burger/ordersummary/ordersummary'
import Spinner from '../../components/ui/spinner/spinner'
import enableErrorCatching from '../../components/catcherrors/catcherrors'
import axiosOrder from '../../axios-orders'
import { connect } from 'react-redux'
import * as actions from '../../store/actions'

class BurgerBuilder extends Component {
    
    state = {
        purchasing: false,
        sendingOrder: false,
        ingredientLoadError: false
    }

    componentDidMount() {
        /*axiosOrder.get('/Ingredients.json')
        .then(res => this.setState({ingredients: res.data}))
        .catch(err => this.setState({ingredientLoadError: true}))*/
    }

    purchaseHandler = (bool) => {
        this.setState({purchasing: bool})
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout')
    }
    
    render() {
        if (this.state.ingredientLoadError) return <p>Ingredient data could not be loaded.</p>
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
                    ingredients={ings.map(ing => {
                        return {name: ing.name, disableMinus: ing.count <= 0}
                    })}
                    addSubHandler={this.props.addSubIngredientHandler}
                    price={totalPriceString}
                    orderButtonDisabled={noIngredients || purchasing}
                    purchaseHandler={() => this.purchaseHandler(true)}
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
})

const mapDispatchToProps = dispatch => ({
    addSubIngredientHandler: (name, willAdd) => {
        dispatch({type: actions.ADD_SUB_INGREDIENT, name: name, willAdd: willAdd})
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(enableErrorCatching(BurgerBuilder, axiosOrder))