import React, { Component } from 'react';
import Burger from '../../components/burger/burger'
import BuildControls from '../../components/burger/buildcontrols/buildcontrols'
import Modal from '../../components/ui/modal/modal'
import OrderSummary from '../../components/burger/ordersummary/ordersummary'
import axiosOrder from '../../axios-orders'

const BURGER_BASE_PRICE = 4

class BurgerBuilder extends Component {
    
    state = {
        ingredients: [
            {name: 'Salad', price: .6, count: 0},
            {name: 'Bacon', price: .5, count: 0},
            {name: 'Cheese', price: .4, count: 0},
            {name: 'Meat', price: 1, count: 0}
        ],
        extraPrice: 0,
        purchasing: false
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
        const order = {
            ingredients: this.state.ingredients
                .filter(el => el.count > 0)
                .map(el => {return {name: el.name, count: el.count}}),
            price: this.getTotalPrice(),
            customer: {
                name: 'Dummey the Dumb Dumb',
                address: 'Test Address',
                deliveryMethod: 'fastest'
            }
        }
        axiosOrder.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }
    
    render() {        
        const ings = this.state.ingredients
        const totalPriceString = this.getTotalPrice().toFixed(2)
        const noIngredients = this.state.extraPrice < .001 //accounting for math errors with floats
        const purchasing = this.state.purchasing
        return (
            <React.Fragment>
                <Burger
                    ingredients={ings}
                    noIngredients={noIngredients}
                />
                <Modal
                    show={purchasing}
                    backdropClicked={() => this.purchaseHandler(false)}>
                    <OrderSummary
                        ingredients={ings}
                        totalPriceString={totalPriceString}
                        cancelHandler={() => this.purchaseHandler(false)}
                        continueHandler={this.purchaseContinueHandler}
                /></Modal>
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

export default BurgerBuilder