import React from 'react'
import classes from './order.css'

const Order = (props) => {
    const ingArray = []
    const ings = props.ingredients
    for (let name in ings)
        ingArray.push((<span key={name} style={{
            display: 'inline-block',
            border: '1px solid #eee',
            margin: '0 8px',
            padding: '7px',
            backgroundColor: '#fff0e2'
        }}>{`${name} (${ings[name]})`}</span>))
    return (
        <div className={classes.Order}>
            <div>Ingredients: {ingArray}</div>
            <div>Price: <strong>${parseFloat(props.price).toFixed(2)}</strong></div>
        </div>
    )
}

export default Order