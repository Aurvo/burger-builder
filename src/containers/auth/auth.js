import React, { Component } from 'react'
import Input from '../../components/ui/input/input'
import Button from '../../components/ui/button/button'
import Spinner from '../../components/ui/spinner/spinner'
import classes from './auth.css'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { auth, isLoggedIn } from '../../store/actions/actions'
import * as Utils from '../../utilities/formUtilities'

class Auth extends Component {
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
            return this.value.trim().length > 7
        }
        //formFields -- Note: name and defaultValue attributes set right after this
        this.formFields = {
            email: {
                value: '',
                label: "Email",
                attributes: {
                    type:"email",
                    placeholder: "Your Email",
                    onChange: changeHandler
                },
                isValid: standardIsValid
            },
            password: {
                value: '',
                label: "Password",
                attributes: {
                    type:"password",
                    placeholder: "Your Password",
                    onChange: changeHandler
                },
                isValid: standardIsValid
            }
        }
        const formingState = Utils.finalizeFieldsAndState(this.formFields)
        formingState.isSignUp = false
        this.state =  formingState
    }

    submitHandler = (event) => {
        event.preventDefault()
        const ff = this.formFields
        this.props.authorize(ff.email.value, ff.password.value, this.state.isSignUp)
    }

    switchHandler = () => {
        this.setState({isSignUp: !this.state.isSignUp})
    }
    
    render() {
        if (isLoggedIn(this.props.authState)) {
            if (this.props.burgerIsBuilding) return <Redirect to="/checkout" />
            return <Redirect to="/" />
        }
        const fieldBools = this.state.validInvalidFields
        let formFields = <Spinner />
        if (!this.props.loading) {
            formFields = <Utils.FormFields
                fieldData={this.formFields}
                fieldBools={fieldBools} />
        }
        let errorMessage = null
        if(this.props.error) {
            errorMessage = (
                <p className={classes.AuthErrorMessage}>{this.props.error.message.replace(/_/g,' ')}</p>
            )
        }
        const isSignUp = this.state.isSignUp
        return (
            <div style={{textAlign: 'center'}}>
                {errorMessage}
                <form className={classes.AuthForm} onSubmit={this.submitHandler}>
                    <h1>{isSignUp ? 'Sign Up' : 'Log In'}</h1>
                    {formFields}
                    <Button type="Success" disabled={!Utils.isFormValid(fieldBools)}>SUBMIT</Button>
                </form>
                <Button type="Danger" clicked={this.switchHandler}>{isSignUp ? 'LOG IN' : 'SIGN UP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    burgerIsBuilding: state.burger.isBuilding,
    authState: state.auth,
    loading: state.auth.loading,
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    authorize: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp))
})

export default connect(mapStateToProps,mapDispatchToProps)(Auth)