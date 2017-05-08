import React, { Component } from 'react';
import {connect} from 'react-redux';

class ItemsList extends Component {
    render() {
        let {items} = this.props;
        return (
            <div>
                {items.length}
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(ItemsList);