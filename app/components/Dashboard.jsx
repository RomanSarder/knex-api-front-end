import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'

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
            return <Redirect to='/items/2'/>
        }
    }
}

export default withRouter(connect(
    (state) => {
        return state;
    }
)(DashBoard));