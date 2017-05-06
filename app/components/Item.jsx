import React, { Component } from 'react';

class Item extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
              <h2>Item {this.props.match.params.id} page</h2>  
            </div>
        );
    }
}

export default Item;