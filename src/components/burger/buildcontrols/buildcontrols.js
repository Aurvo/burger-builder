import React from 'react'
import BuildControl from './buildcontrol'
import classes from './buildcontrols.css'

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price}</strong></p>
            {props.ingredients.map(ing => {
                const name = ing.name
                return <BuildControl
                    key={name}
                    ingredientName={name}
                    addMethod={() => props.addSubHandler(name, true)}
                    subtractMethod={() => props.addSubHandler(name, false)}
                    disableMinus={ing.disableMinus}/>
            })}
            <button
            className={classes.OrderButton}
            disabled={props.orderButtonDisabled}
            onClick={props.purchaseHandler}>{props.loggedIn ? 'ORDER NOW' : 'LOG IN TO CONTINUE'}</button>
        </div>
    )
}

export default buildControls