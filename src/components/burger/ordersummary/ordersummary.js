import React from 'react'
import Button from '../../ui/button/button'

const ordersummary = (props) => {
    let count;
    const ingredientsArray = props.ingredients.map(ing => {
        count = ing.count
        if (count > 0)
            return (<li key={ing.name+count}>{ing.name}{count > 1 ? (' x'+count) : ''}:
                {' $'+(ing.count*ing.price).toFixed(2)}</li>)
        else
            return null
    })
    return (
        <React.Fragment>
            <h3>Your Order:</h3>
            <p>A delicious burger ($4.00) with the following ingredients:</p>
            <ul>
                {ingredientsArray}
            </ul>
            <p><strong>Total Price: {'$'+props.totalPriceString}</strong></p>
            <p>Continue to checkout?</p>
            <Button type='Danger' clicked={props.cancelHandler}>CANCEL</Button>
            <Button type='Success' clicked={props.continueHandler}>CONTINUE</Button>
        </React.Fragment>
    )
}

export default ordersummary