import axios from 'axios'
import axiosOrder from '../../axios-orders'
import { authKey } from '../../firebase-project-constants'

//Burger
export const ADD_SUB_INGREDIENT = 'ADD_SUB_INGREDIENT'
export const INIT_INGREDIENTS = 'INIT_INGREDIENTS'
export const SET_INGREDIENTS_ERROR = 'SET_INGREDIENTS_ERROR'

export const addSubIngredient = (name, willAdd) => 
    ({type: ADD_SUB_INGREDIENT, name: name, willAdd: willAdd})

export const initIngredients = () => {
    return dispatch => {
        axiosOrder.get('/Ingredients.json')
        .then(res => dispatch({type: INIT_INGREDIENTS, ingredients: res.data}))
        .catch(err => dispatch({type: SET_INGREDIENTS_ERROR, value: true}))
    }
}

//Orders
export const SET_SENDING_ORDER = 'SET_SENDING_ORDER'
export const SET_JUST_SENT = 'SET_JUST_SENT'

export const dispatchOrder = (order, token) => {
    return dispatch => {
        dispatch({type: SET_SENDING_ORDER, value: true})
        axiosOrder.post('/orders.json?auth='+token, order)
            .then(response => {
                dispatch({type: SET_SENDING_ORDER, value: false})
                dispatch({type: SET_JUST_SENT, value: true})
            })
            .catch(error => dispatch({type: SET_SENDING_ORDER, value: false}))
    }
}

//Authentication
export const SET_AUTH = 'SET_AUTH'
export const SET_AUTH_LOADING = 'SET_AUTH_LOADING'
export const RESET_AUTH = 'RESET_AUTH'

//log user in or handle error--edits redux store and localStorage--async request
export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch({type: SET_AUTH_LOADING, value: true})
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+authKey
        if (isSignUp)
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+authKey
        const loginStartTime = Date.now()
        axios.post(url, {email: email, password: password, returnSecureToken: true}
        ).then(response => {
            const expirationTime = loginStartTime + (parseInt(response.data.expiresIn,10)*1000)
            console.log('success',expirationTime-loginStartTime)
            //localStorage
            localStorage.setItem('token', response.data.idToken)
            localStorage.setItem('userID', response.data.localId)
            localStorage.setItem('expirationTime', expirationTime)
            //redux dispatch
            dispatch({type: SET_AUTH, atts: {
                token: response.data.idToken,
                userId: response.data.localId,
                expirationTime: expirationTime,
                loading: false
            }})
        }).catch(err => {
            console.log('error',err)
            dispatch({type: SET_AUTH, atts: {
            error: err.response.data.error,
            loading: false
        }})})
    }
}

//log user out--remove localStorage refs and reset store
export const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userID')
    localStorage.removeItem('expirationTime')
    return {type: RESET_AUTH}
}

//Auth utility functions that are not exactly action creators

//user is logged in if the passed state (redux store state or an object representing
//that) has a login token and if its expirationTime is ahead of the current real time
export const isLoggedIn = (state) => state.token && Date.now() < state.expirationTime

//initiates the redux store's auth section differently depending on whether
//the user is logged in or not (references localStorage)
//claled from either index.js or ap.js
export const initAuthStatus = (store) => {
    const possibleAuthState = {
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userID'),
        expirationTime: parseInt(localStorage.getItem('expirationTime'),10)
    }
    //if user would be logged in if redux store had above state
    if (isLoggedIn(possibleAuthState)) {
        //make above state the real state
        store.dispatch({
            type: SET_AUTH,
            atts: possibleAuthState
        })
    } else {
        //log user out--remove localStorage refs and reset store
        store.dispatch(logOut())
    }
}