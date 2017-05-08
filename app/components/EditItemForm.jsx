import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class EditItemForm extends Component {
    constructor(props) {
        super(props);
    }
    componentWillUnmount() {
        console.log('Unmounted');
    }
    
    componentWillMount() {
        console.log('Will mount');
    }
    
    
    render() {
        return (
            <div>
              <h2>ItemPage {this.props.match.params.id} edit page</h2>  
            </div>
        );
    }
}

export default withRouter(EditItemForm);