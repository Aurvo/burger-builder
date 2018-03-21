import React, { Component } from 'react'
import classes from './ingredient.css'
import PropTypes from 'prop-types'

class Ingredient extends Component {
    render() {
        let ingredient = null
        const propType = this.props.type
        const style = {boxSizing: 'border-box'}
        if (propType === 'BreadTop') {
            ingredient = (
                <div className={classes.BreadTop} style={style}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            )
        } else {
            let classType =  classes[propType]
            if (classType) ingredient = <div className={classType} style={style}></div>
            else throw new ReferenceError('Invalid ingredient type: ' + propType)
        }
        return ingredient
    }
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default Ingredient