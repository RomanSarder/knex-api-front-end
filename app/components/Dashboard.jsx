import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import * as actions from 'actions';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(actions.fetchItems());
    }
    render() {
    let {items} = this.props;
    let renderItems = () => {
        if (!items) {
            return
        }
        return items.map((item) => {
            let {action, author} = item.logs[item.logs.length-1];
            return(<div className="dashboard-item">
                <p>{item.name}</p>
                <p>{item.number}</p>
                <p>{item.state}</p>
                <p>{`${action} by ${author}`}</p>
            </div>)
        })
    }
    
        if (this.props.auth.token) {
            return (
                <div className="dashboard-container">
                    {renderItems()}
                </div>
            );
        } else {
            return <Redirect to='/'/>
        }
    }
}

export default connect(
    (state) => {
        return state;
    }
)(DashBoard);

