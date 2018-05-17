import React from 'react'
import Input from '../components/ui/input/input'

export const isFormValid = (fieldBools) => {
    for (let name in fieldBools) if (!fieldBools[name]) return false
    return true
}

export const FormFields = (props) => {
    const fieldArray = []
    const fieldData = props.fieldData
    for (let name in fieldData) {
        const field = fieldData[name]
        fieldArray.push(<Input
            key={name}
            elementType={field.elementType}
            label={field.label}
            attributes={field.attributes}
            options={field.options}
            invalid={!(props.fieldBools[name]
                || field.value === '')}
        />)
    }
    return fieldArray
}

export function finalizeFieldsAndState(formFields) {
    let validInvalidFields = {}
    //configure formFields further: name and defaultValue
    for (let name in formFields) {
        let field = formFields[name]
        let atts = field.attributes
        atts.name = name
        atts.defaultValue = field.value
        //configure state
        validInvalidFields[name] = formFields[name].isValid()
    }
    //state contains a field for each form element. For each field, the value is
    //true if the field shodul display as valid and false if the field should display
    //as invalid (note: empty fields will display as if valid)
    return  {validInvalidFields: validInvalidFields}
}