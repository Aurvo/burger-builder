import React from 'react'
import { Redirect } from 'react-router-dom'
import { logOut } from '../../store/actions/actions'
import { connect } from 'react-redux'

const logOutPage = (props) => {
    props.dispatch(logOut())
    return <Redirect to="/"/>
}

export default connect()(logOutPage)