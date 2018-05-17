import * as actions from '../actions/actions'

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    expirationTime: null
}

const authReducer = (state = {...initialState}, action) => {
    switch(action.type) {
        case actions.SET_AUTH:
            return {...state, ...action.atts};
        case actions.SET_AUTH_LOADING:
            return{...state, loading: action.value};
        case actions.RESET_AUTH:
            return {...initialState};
        default: return state;
    }
}

export default authReducer