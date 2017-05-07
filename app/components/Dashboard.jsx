import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.auth.token) {
            return (
                <h2>Here will be dashboard with items.</h2>
            );
        } else {
            return <Redirect to={{pathname: '/'}} push/>
        }
    }
}

export default connect(
    (state) => {
        return state;
    }
)(DashBoard);