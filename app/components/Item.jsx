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
                <h3>{item.name}</h3>
                <div className="info-container">
                    <span>Amount: {item.number}</span>
                    <span>{item.state}</span>
                </div>
                <span className="created">{`${action} by ${author}`}</span>
                <span className="last-log">{`Last log: ${item.logs[0].action} by ${item.logs[0].author}`}</span>
                <div className="buttons">
                    <Link to={`/items/${item.id}/edit`}><button className="edit-button">Edit</button></Link>
                    <Link to="/"><button className="delete-button">Delete</button></Link>
                </div>
            </div>
        );
    }
}

export default Item;

{/*<Link className="edit-button" to={`/items/${item.id}/edit`}>Edit</Link>
                    <Link className="delete-button" to="/">Delete</Link>*/}