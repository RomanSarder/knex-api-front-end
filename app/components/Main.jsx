import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from 'Home';
import Dashboard from 'Dashboard';
import Item from 'Item';

export class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {auth} = this.props;
        return (
            <div>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/items/:id" component={Item}/>                
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(Main);