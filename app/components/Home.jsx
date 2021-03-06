import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import {push} from 'react-router-redux';
import {Link} from 'react-router';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.token) {
            this.props.dispatch(push('/dashboard'));
        }
    }
    
    handleSubmit(e) {
        let {isLoading, auth, dispatch} = this.props
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        dispatch(actions.login(email, password));
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
                        <input type="text" name="email" placeholder="Email" ref="email" required/>
                    </div>
                    <div className="field">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="password" ref="password" required/>
                    </div>
                    <button className="form-button" type="submit">{renderLoading()}</button>
                    <Link to="/register">Register</Link>
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