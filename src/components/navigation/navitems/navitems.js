import React from 'react'
import NavItem from './navitem'
import classes from './navitems.css'

const navitems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/" active>Burger Builder</NavItem>
            <NavItem link="/">Checkout</NavItem>
        </ul>
    )
}

export default navitems