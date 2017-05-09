import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import {push} from 'react-router-redux';
import Item from 'Item';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if (this.props.auth.token) {
            this.props.dispatch(actions.deleteItems());
            this.props.dispatch(actions.fetchItems());
        } else {
            this.props.dispatch(push('/'));
            this.props.dispatch(actions.setError('You must log in.'))
        }
    }
    render() {
        let { items } = this.props;
        let key = 0;
        let renderItems = () => {
            if (!items) {
                return
            }
            return items.map((item) => {
                return (<Item key={key++} item={item}/>)
            })
        }
            return (
                <div className="dashboard-container">
                    {renderItems()}
                </div>
            );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(DashBoard);

