import React from 'react'
import classes from './logo.css'
import burgerLogo from '../../assets/images/burger-logo.png'

const logo = (props) => {
    return (
        <div className={classes.Logo}
            style={props.style}><img src={burgerLogo} alt="Burger Logo"/></div>
    )
}

export default logo