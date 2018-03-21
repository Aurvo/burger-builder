import React from 'react'
import Ingredient from './ingredient/ingredient'
import classes from './burger.css'

const burger = (props) => {
    const ings = props.ingredients
    let transformedIngredients = ings.map(ing => {
        const ingName = ing.name
        return [...Array(ing.count)].map((_, index) => {
            return <Ingredient type={ingName} key={ingName+index} />
        })
    })
    if (props.noIngredients) transformedIngredients = <p>Please start adding ingredients.</p>
    return (
        <div className={classes.Burger}>
            <Ingredient type="BreadTop"/>
            {transformedIngredients}
            <Ingredient type="BreadBottom"/>
        </div>
    );
}

export default burger