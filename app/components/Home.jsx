import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';

class Home extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps');
        if (!nextProps.isLoading) {
            if (nextProps.auth.error) {
                console.log('error');
            } else if (nextProps.auth.token) {
                console.log('success');
            } else {
                console.log('something else');
            }
        }
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
        let renderMessage = () => {
            if (auth.error) {
                return <p className="error-message">{auth.error}</p>;
            } else if (auth.token) {
                return <p className="success-message">You have successfully logined in.</p>
            } else {
                return <p></p>
            }
        }
        return (
            <div className="form-container">
                {renderMessage()}
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>First Name</label>
                        <input type="text" name="email" placeholder="First Name" ref="email" />
                    </div>
                    <div className="field">
                        <label>Last Name</label>
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