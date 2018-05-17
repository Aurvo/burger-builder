import React, { Component } from 'react'
import classes from './layout.css'
import Toolbar from '../navigation/toolbar/toolbar'
import SideDrawer from '../navigation/sidedrawer/sidedrawer'
import { connect } from 'react-redux'
import { isLoggedIn } from '../../store/actions/actions'

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
        const userLoggedIn = isLoggedIn(this.props.authState)
        return (
            <React.Fragment>
                <SideDrawer
                    loggedIn={userLoggedIn}
                    show={this.state.showSideDrawer}
                    closeHandler={this.sideDrawerClosHandler}/>
                <Toolbar loggedIn={userLoggedIn} toggleDrawerHandler={this.toggleDrawerHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    authState: state.auth
})

export default connect(mapStateToProps)(Layout)