import React from 'react'
import Burger from '../../burger/burger'
import Button from '../../ui/button/button'
import classes from './checkoutsummary.css'

const CheckoutSummary = (props) => {
    return  (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auito'}}>
                <Burger ingredients={props.ingredients} noIngredients={false}/>
            </div>
            <Button type='Danger' clicked={props.cancelHandler}>CANCEL</Button>
            <Button type='Success' clicked={props.continueHandler}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary