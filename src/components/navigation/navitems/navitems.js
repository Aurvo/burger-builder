import React from 'react'
import NavItem from './navitem'
import classes from './navitems.css'

const navitems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/burgerbuilder">Burger Builder</NavItem>
            <NavItem link="/orders">My Orders</NavItem>
        </ul>
    )
}

export default navitems