import React from 'react'
import classes from './buildcontrols.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.ingredientName}</div>
            <button
                className={classes.Less}
                onClick={props.subtractMethod}
                disabled={props.disableMinus}>-</button>
            <button
                className={classes.More}
                onClick={props.addMethod}>+</button>
        </div>
    )
}

export default buildControl