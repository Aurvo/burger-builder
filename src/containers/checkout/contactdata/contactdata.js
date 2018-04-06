import React , { Component } from 'react'
import classes from './contactdata.css'
import Button from '../../../components/ui/button/button'
import Input from '../../../components/ui/input/input'
import Spinner from '../../../components/ui/spinner/spinner'
import axiosOrder from '../../../axios-orders'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class ContactData extends Component {
    constructor() {
        super()
        this.changeHandler = (event) => {
            const ename = event.target.name
            this.formFields[ename].value = event.target.value
            const fieldBools = {...this.state.validInvalidFields}
            fieldBools[ename] = formFields[ename].isValid()
            this.setState({validInvalidFields: fieldBools})
        }
        const changeHandler = this.changeHandler
        const standardIsValid = function() {
            return this.value.trim().length > 5
        }
        //formFields -- Note: name and defaultValue attributes set right after this
        this.formFields = {
            name: {
                value: '',
                label: "Name",
                attributes: {
                    type:"text",
                    placeholder: "Name",
                    onChange: changeHandler
                },
                isValid: standardIsValid
            },
            email: {
                value: '',
                label: "Email",
                attributes: {
                    type:"email",
                    placeholder: "Email",
                    onChange: changeHandler
                },
                isValid: function() {return this.value.match(/\b.+@.+\..+\b/) !== null}
            },
            streetAddress: {
                value: '',
                label: "Street Address",
                attributes: {
                    type:"text",
                    placeholder: "Address",
                    onChange: changeHandler
                },
                isValid: standardIsValid
            },
            zipCode: {
                value: '',
                label: "Postal Code",
                attributes: {
                    type:"text",
                    placeholder: "Zip Code",
                    onChange: changeHandler
                },
                isValid: function() {return this.value.match(/\b\d{5}\b/) !== null}
            },
            deliveryType: {
                elementType: "select",
                label: "Delivery Type",
                value: 'normal',
                attributes: {
                    onChange: changeHandler
                },
                options: [
                    {
                        attributes: {value: 'normal'},
                        text: 'Normal'
                    },
                    {
                        attributes: {value: 'fast'},
                        text: 'Fast'
                    }
                ],
                isValid: function() {return true}
            }
        }
        //configure formFields further: name and defaultValue
        const formFields = this.formFields
        for (let name in formFields) {
            let field = formFields[name]
            let atts = field.attributes
            atts.name = name
            atts.defaultValue = field.value
        }
        //configure state
        let validInvalidFields = {}
        for (let name in this.formFields) {
            validInvalidFields[name] = this.formFields[name].isValid()
        }
        //state contains a field for each form element. For each field, the value is
        //true if the field shodul display as valid and false if the field should display
        //as invalid (note: empty fields will display as if valid)
        this.state =  {
            validInvalidFields: validInvalidFields,
            sendingOrder: false
        }
    }

    isFormValid = () => {
        const fieldBools = this.state.validInvalidFields
        for (let name in fieldBools) if (!fieldBools[name]) return false
        return true
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({sendingOrder: true})
        const ingsObj =  {}
        this.props.ingredients.filter(el => el.count > 0)
            .forEach(el => ingsObj[el.name] = el.count)
        const formFields = this.formFields
        const order = {
            ingredients: ingsObj,
            price: this.props.totalPrice,
            customer: {
                name: formFields.name.value,
                email: formFields.email.value,
                streetAddress: formFields.streetAddress.value,
                zipCode: formFields.zipCode.value,
                deliveryType: formFields.deliveryType.value
            }
        }
        axiosOrder.post('/orders.json', order)
            .then(response => {
                this.setState({sendingOrder: false})
                this.props.history.replace('/')
            })
            .catch(error => this.setState({sendingOrder: false}))
    }

    render() {
        let formOrSpinner = <Spinner />
        if (!this.state.sendingOrder) {
            const formFields = []
            const thisFormFields = this.formFields
            for (let name in thisFormFields) {
                const field = thisFormFields[name]
                formFields.push(<Input
                    key={name}
                    elementType={field.elementType}
                    label={field.label}
                    attributes={field.attributes}
                    options={field.options}
                    invalid={!(this.state.validInvalidFields[name]
                        || field.value === '')}
                />)
            }
            formOrSpinner =  (
                <form>
                    {formFields}
                    <Button type="Success" clicked={this.orderHandler}
                        disabled={!this.isFormValid()}>ORDER</Button>
                </form>
            )
        }
        return  (
            <div className={classes.ContactData}>
                <h4>Enter your contact data:</h4>
                {formOrSpinner}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
})

export default connect(mapStateToProps)(withRouter(ContactData))