import React , { Component } from 'react'
import classes from './contactdata.css'
import Button from '../../../components/ui/button/button'
import Input from '../../../components/ui/input/input'
import Spinner from '../../../components/ui/spinner/spinner'
import catchErrors from '../../../components/catcherrors/catcherrors'
import axiosOrder from '../../../axios-orders'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/actions'
import * as Utils from '../../../utilities/formUtilities'

class ContactData extends Component {
    constructor() {
        super()
        this.changeHandler = (event) => {
            const ename = event.target.name
            this.formFields[ename].value = event.target.value
            const fieldBools = {...this.state.validInvalidFields}
            fieldBools[ename] = this.formFields[ename].isValid()
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
        //edit form this.fileds to be potimal for the form and
        //configure and return state (one field validInvalidFields)
        this.state = Utils.finalizeFieldsAndState(this.formFields)
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({sendingOrder: true})
        const ingsObj =  {}
        this.props.ingredients.filter(el => el.count > 0)
            .forEach(el => ingsObj[el.name] = el.count)
        const formFields = this.formFields
        const order = {
            userId: this.props.userId,
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
        this.props.sendOrder(order, this.props.token)
    }

    render() {
        //redirect to burger builder page if just sent order,
        //status for justSentOrder is reset when that page is loaded
        if (this.props.justSentOrder) return <Redirect to="/"/>
        const validInvalidFields = this.state.validInvalidFields
        let formOrSpinner = <Spinner />
        if (!this.props.sendingOrder) {    
            formOrSpinner =  (
                <form>
                    <Utils.FormFields
                        fieldData={this.formFields}
                        fieldBools={this.state.validInvalidFields} />
                    <Button type="Success" clicked={this.orderHandler}
                        disabled={!Utils.isFormValid(validInvalidFields)}>ORDER</Button>
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
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    sendingOrder: state.order.sendingOrder,
    justSentOrder: state.order.justSentOrder,
    token: state.auth.token,
    userId: state.auth.userId
})

const mapDispatchToProps = dispatch => ({
    sendOrder: (order, token) => dispatch(actions.dispatchOrder(order, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(catchErrors(ContactData, axiosOrder)))