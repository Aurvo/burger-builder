import React, { Component } from 'react'
import classes from './layout.css'
import Toolbar from '../navigation/toolbar/toolbar'
import SideDrawer from '../navigation/sidedrawer/sidedrawer'

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosHandler = () => {
        this.setState({showSideDrawer: false})
    }

    toggleDrawerHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        })
    }
    
    render() {
        return (
            <React.Fragment>
                <SideDrawer
                    show={this.state.showSideDrawer}
                    closeHandler={this.sideDrawerClosHandler}/>
                <Toolbar toggleDrawerHandler={this.toggleDrawerHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        )
    }
}

export default Layout