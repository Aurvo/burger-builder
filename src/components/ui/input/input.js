import React from 'react'
import classes from './input.css'

const input = (props) => {
    let inputElement = null
    let elementClasses = [classes.InputElement]
    if (props.invalid)
        elementClasses.push(classes.Invalid)
    elementClasses = elementClasses.join(' ')
    switch(props.elementType) {
        case 'select':
            inputElement = (
                <select className={elementClasses} {...props.attributes}>
                    {props.options.map((op, index) => (
                        <option key={index} {...op.attributes}>{op.text}</option>
                    ))}
                </select>
            )
            break;
        case 'textArea':
            inputElement = <textarea className={elementClasses} {...props.attributes}/>;
            break;
        case null:
        case 'input':
        case undefined:
            inputElement = <input className={elementClasses} {...props.attributes}/>;
            break;
        default:
            throw new Error('Invalid input element type: ' + props.elementType);
    }
    return  (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}:</label>
            {inputElement}
        </div>
    )
}

export default input