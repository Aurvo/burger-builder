import React, { Component } from 'react';
import Burger from '../../components/burger/burger'
import BuildControls from '../../components/burger/buildcontrols/buildcontrols'
import Modal from '../../components/ui/modal/modal'
import OrderSummary from '../../components/burger/ordersummary/ordersummary'
import Spinner from '../../components/ui/spinner/spinner'
import enableErrorCatching from '../../components/catcherrors/catcherrors'
import axiosOrder from '../../axios-orders'

const BURGER_BASE_PRICE = 4

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        extraPrice: 0,
        purchasing: false,
        sendingOrder: false,
        ingredientLoadError: false
    }

    componentDidMount() {
        axiosOrder.get('/Ingredients.json')
        .then(res => this.setState({ingredients: res.data}))
        .catch(err => this.setState({ingredientLoadError: true}))
    }

    getTotalPrice = () => this.state.extraPrice + BURGER_BASE_PRICE

    //event handler for adding/removing ingredients
    //ingName: ingredient field to change
    //willAdd: true if adding 1, false if subtracting 1
    addSubIngredientHandler = (ingName, willAdd) => {
        const ings = [...this.state.ingredients]
        let extraPrice = this.state.extraPrice
        const ing = ings.find(el => el.name === ingName) //get propper ing
        if (ing.count <= 0 && !willAdd) return //return if subtracting when no ingredients
        const oneOrNegOne = willAdd ? 1 : -1
        ing.count += oneOrNegOne
        extraPrice += oneOrNegOne * ing.price
        this.setState({ingredients: ings, extraPrice: extraPrice});
    }

    purchaseHandler = (bool) => {
        this.setState({purchasing: bool})
    }

    purchaseContinueHandler = () => {
        this.setState({sendingOrder: true})
        const ingsObj = {}
        this.state.ingredients.filter(el => el.count > 0)
            .forEach(el => ingsObj[el.name] = el.count)
        const order = {
            ingredients: ingsObj,
            price: this.getTotalPrice(),
            customer: {
                name: 'Dummey the Dumb Dumb',
                address: 'Test Address',
                deliveryMethod: 'fastest'
            }
        }
        axiosOrder.post('/orders.json', order)
            .then(response => this.setState({purchasing: false, sendingOrder: false}))
            .catch(error => this.setState({purchasing: false, sendingOrder: false}))
    }
    
    render() {        
        if (this.state.ingredientLoadError) return <p>Ingredient data could not be loaded.</p>
        const ings = this.state.ingredients
        if (!ings) return <Spinner />
        const totalPriceString = this.getTotalPrice().toFixed(2)
        const noIngredients = this.state.extraPrice < .001 //accounting for math errors with floats
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
                    addSubHandler={this.addSubIngredientHandler}
                    price={totalPriceString}
                    orderButtonDisabled={noIngredients || purchasing}
                    purchaseHandler={() => this.purchaseHandler(true)}
                />
            </React.Fragment>
        )
    }
}

export default enableErrorCatching(BurgerBuilder, axiosOrder)