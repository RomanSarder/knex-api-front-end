import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import {Redirect} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        let {isLoading, auth, dispatch} = this.props
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        dispatch(actions.login(email, password))
    }
    render() {
        let {isLoading, auth} = this.props;
        let renderLoading = () => {
            if (isLoading) {
                return 'Loading...'
            } else {
                return 'Submit';
            }
        }
        if (auth.token) {
            return (<Redirect to='/dashboard'/>)
        }
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="email" placeholder="First Name" ref="email" />
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="text" name="password" placeholder="Last Name" ref="password"/>
                    </div>
                    <button className="form-button" type="submit">{renderLoading()}</button>
                </form>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(Home);