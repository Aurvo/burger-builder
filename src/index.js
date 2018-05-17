import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import burgerReducer from './store/reducers/burger-building-reducer'
import orderReducer from './store/reducers/order-reducer'
import authReducer from './store/reducers/auth-reducer'
import registerServiceWorker from './registerServiceWorker';
import { initAuthStatus } from './store/actions/actions'

const rootReducer = combineReducers({
    burger: burgerReducer,
    order: orderReducer,
    auth: authReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

initAuthStatus(store)

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
