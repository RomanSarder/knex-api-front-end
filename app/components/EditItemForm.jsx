import React, { Component } from 'react';

class EditItemForm extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
              <h2>ItemPage {this.props.match.params.id} edit page</h2>  
            </div>
        );
    }
}

export default EditItemForm;