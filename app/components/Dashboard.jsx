import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

class DashBoard extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(actions.deleteItems());
        this.props.dispatch(actions.fetchItems());
    }
    render() {
        let { items } = this.props;
        let key = 0;
        let renderItems = () => {
            if (!items) {
                return
            }
            return items.map((item) => {
                let { action, author } = item.logs[item.logs.length - 1];
                return (
                    <div className="dashboard-item" key={key++}>
                        <h3>{item.name}</h3>
                        <div className="info-container">
                            <span>Amount: {item.number}</span>
                            <span>{item.state}</span>
                        </div>
                        <span className="created">{`${action} by ${author}`}</span>
                        <span className="last-log">{`Last log: ${item.logs[0].action} by ${item.logs[0].author}`}</span>
                        <div className="buttons">
                            {/*<Link to={`/items/${item.id}/edit`}>Edit</Link>
                            <Link to='/'>Delete</Link>*/}
                        </div>
                    </div>
                );
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

