import React, { Component } from 'react';
import {Link} from 'react-router';
import * as actions from 'actions';
import {connect} from 'react-redux';

class Item extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        let {dispatch, item, auth} = this.props;
        dispatch(actions.deleteItem(item.id, auth.token));
    }
    render() {
        let { item } = this.props;
        let { action, author } = item.logs[item.logs.length - 1];
        return (
            <div className="dashboard-item" onClick={() => {console.log('Clicked');}}>
                <span className="created">{`${item.logs[0].action} by ${item.logs[0].author}`}</span>
                <h3>{item.name}</h3>
                <div className="info-container">
                    <span>Amount: {item.number}</span>
                    <span>{item.state}</span>
                </div>
                <span className="last-log">{`Last log: ${action} by ${author}`}</span>
                <div className="buttons">
                    <Link to={`/items/${item.id}/edit`}><button className="edit-button">Edit</button></Link>
                    <button className="delete-button" onClick={this.handleClick}>Delete</button>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {auth: state.auth}
})(Item);