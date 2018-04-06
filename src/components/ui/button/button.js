import React from 'react'
import classes from './button.css'

const button = (props) => {
    return (
        <button
            className={[classes.Button, classes[props.type]].join(' ')}
            onClick={props.clicked}
            disabled={props.disabled}
        >{props.children}</button>
    )
}

export default button