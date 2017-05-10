import React, { Component } from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import * as actions from 'actions';

class RegisterForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.token) {
            this.props.dispatch(push('/dashboard'));
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let {dispatch} = this.props;
        let name = this.refs.name.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        dispatch(actions.register({email, name, password}));  
    }
    render() {
        let {isLoading, auth, dispatch} = this.props;
        let renderLoading = () => {
            if (isLoading) {
                return 'Loading...'
            } else {
                return 'Submit';
            }
        }
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input type="text" name="email" placeholder="Email" ref="email"  required/>
                    </div>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" ref="name" required/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="text" name="password" placeholder="password" ref="password" required/>
                    </div>
                    <button className="form-button" type="submit">{renderLoading()}</button>
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isLoading: state.isLoading,
        auth: state.auth
    }
})(RegisterForm);