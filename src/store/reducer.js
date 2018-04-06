import * as actions from './actions'

const innitialState = {
    ingredients: [
        {name: 'Salad', count: 0, price: .6},
        {name: 'Bacon', count: 0, price: .5},
        {name: 'Cheese', count: 0, price: .4},
        {name: 'Meat', count: 0, price: 1},
    ],
    totalPrice: 4
}

const reducer = (state = innitialState, action) => {
    switch (action.type) {
        case actions.ADD_SUB_INGREDIENT:
            const ings = [...state.ingredients];
            let totalPrice = state.totalPrice;
            const oneOrNegOne = action.willAdd ? 1 : -1;
            const ing = ings.find(el => el.name === action.name); //get propper ing
            if (ing.count <= 0 && oneOrNegOne < 0) return; //return if subtracting when no ingredients
            ing.count += oneOrNegOne;
            totalPrice += oneOrNegOne * ing.price;
            return {...state, ingredients: ings, totalPrice: totalPrice};
        case 'abcde':
            return 8;
    }
    return state
}

export default reducer