import React from 'react'
import Logo from '../../logo/logo'
import NavItems from '../navitems/navitems'
import Backdrop from '../../ui/backdrop/backdrop'
import classes from './sidedrawer.css'

const sidedrawer = (props) => {
    const attachedClasses = [
        classes.SideDrawer,
        props.show ? classes.Open : classes.Close
    ].join(' ')
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.closeHandler}/>
            <div className={attachedClasses} onClick={props.closeHandler}>
                <Logo style={{height: '11%', marginBottom: '32px'}}/>
                <NavItems loggedIn={props.loggedIn} />
            </div>
        </React.Fragment>
    )
}

export default sidedrawer