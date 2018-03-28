import React, { Component } from 'react'
import Modal from '../ui/modal/modal'

const catcherrors = (WrappedComponent, axiosInstance) => {
    return class extends Component {
        state = {
            error: null
        }
        
        componentWillMount() {
            this.requestInterceptor = axiosInstance.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.responseInterceptor = axiosInstance.interceptors.response.use(res => res, error => {
                this.setState({error: error})
                return Promise.reject()
            })
        }

        componentWillUnmount() {
            axiosInstance.interceptors.request.eject(this.requestInterceptor)
            axiosInstance.interceptors.response.eject(this.responseInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        
        render () {
            const error = this.state.error
            return (
                <React.Fragment>
                    <Modal
                        show={error}
                        backdropClicked={this.errorConfirmedHandler}
                    >{error ? error.message : null}</Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }
}

export default catcherrors