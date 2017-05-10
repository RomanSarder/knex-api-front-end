import React, { Component } from 'react';
import {Link} from 'react-router';

class Item extends Component {
    constructor(props) {
        super(props);
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
                    <Link to="/"><button className="delete-button">Delete</button></Link>
                </div>
            </div>
        );
    }
}

export default Item;