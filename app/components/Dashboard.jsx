import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom'
import * as actions from 'actions';
import Item from 'Item';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(actions.deleteItems());
        this.props.dispatch(actions.fetchItems());
    } 
    render() {
    let {items} = this.props;
    let key = 0;
    let renderItems = () => {
        if (!items) {
            return
        }
        return items.map((item) => {
            let {action, author} = item.logs[item.logs.length-1];
            return(<Item key={key++} item={item}/>)
        })
    }
    
        if (this.props.auth.token) {
            return (
                <div className="dashboard-container">
                    {renderItems()}
                </div>
            );
        } else {
            this.props.dispatch(actions.setError('You must log in.'))
            return <Redirect to='/'/>
        }
    }
}

export default connect(
    (state) => {
        return state;
    }
)(DashBoard);

