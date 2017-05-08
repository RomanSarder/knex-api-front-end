import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        let { item } = this.props;
        let { action, author } = item.logs[item.logs.length - 1];
        return (
            <div className="dashboard-item">
                <h3>{item.name}</h3>
                <div className="info-container">
                    <span>Amount: {item.number}</span>
                    <span>{item.state === 1 ? 'In warehouse' : 'In transit'}</span>
                </div>
                <span className="created">{`${action} by ${author}`}</span>
                <span className="last-log">{`Last log: ${item.logs[0].action} by ${item.logs[0].author}`}</span>
                <div className="buttons">
                    <button className="edit-button">Edit</button>
                    <button className="delete-button">Delete</button>
                </div>
            </div>
        );
    }
}

export default Item;