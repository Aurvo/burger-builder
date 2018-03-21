import React, {Component} from 'react'
import Backdrop from '../backdrop/backdrop'
import classes from './modal.css'

class Modal extends Component {
    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.show !== this.props.show
    }
    
    render() {
        const show = this.props.show
        return (
            <React.Fragment>
                <Backdrop show={show} clicked={this.props.backdropClicked}/>
                <div
                className={classes.Modal}
                style={{
                    transform: show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: show ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default Modal