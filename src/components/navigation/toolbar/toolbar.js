import React from 'react'
import Logo from '../../logo/logo'
import NavItems from '../navitems/navitems'
import DrawerToggle from '../sidedrawer/drawertoggle'
import classes from './toolbar.css'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle clicked={props.toggleDrawerHandler} />
            <Logo style={{height: '100%'}}/>
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
    )
}

export default toolbar