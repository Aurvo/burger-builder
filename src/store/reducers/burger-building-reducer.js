import * as actions from '../actions/actions'

const innitialState = {
    ingredients: [],
    totalPrice: 4,
    ingredientsLoadError: false,
    isBuilding: false
}

const reducer = (state = {...innitialState}, action) => {
    switch (action.type) {
        case actions.ADD_SUB_INGREDIENT:
            const ings = [...state.ingredients];
            let totalPrice = state.totalPrice;
            const oneOrNegOne = action.willAdd ? 1 : -1;
            const ing = ings.find(el => el.name === action.name); //get propper ing
            if (ing.count <= 0 && oneOrNegOne < 0) return; //return if subtracting when no ingredients
            ing.count += oneOrNegOne;
            totalPrice += oneOrNegOne * ing.price;
            return {
                ...state,
                ingredients: ings,
                totalPrice: totalPrice,
                isBuilding: true
            };
        case actions.INIT_INGREDIENTS:
            return {...state,
                ingredients: action.ingredients,
                totalPrice: 4,
                ingredientsLoadError: false,
                isBuilding: false
            };
        case actions.SET_INGREDIENTS_ERROR:
            return {...state, ingredientsLoadError: action.value};
        default:
            return state;
    }
}

export default reducer