import * as actions from '../actions/actions'

const innitialState = {sendingOrder: false, justSentOrder: false}

const orderReducer = (state = innitialState, action) => {
    switch (action.type) {
        case actions.SET_SENDING_ORDER:
            return {...state, sendingOrder: action.value};
        case actions.SET_JUST_SENT:
            return {...state, justSentOrder: action.value};
        default:
            return state;
    }
}

export default orderReducer