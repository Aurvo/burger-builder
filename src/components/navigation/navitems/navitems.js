import React from 'react'
import NavItem from './navitem'
import classes from './navitems.css'

const navitems = (props) => {
    const loggedIn = props.loggedIn
    return (
        <ul className={classes.NavigationItems}>
            <NavItem link="/burgerbuilder">Burger Builder</NavItem>
            {loggedIn ? <NavItem link="/orders">My Orders</NavItem> : null}
            {loggedIn ? <NavItem link="/logout">Log Out</NavItem> : <NavItem link="/auth">Log In</NavItem>}
        </ul>
    )
}

export default navitems