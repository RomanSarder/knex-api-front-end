import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Home from 'Home';
import Dashboard from 'Dashboard';
import Item from 'Item';

class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Route exact={true} path="/" component={Home}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/items/:id" component={Item}/>                
            </div>
        );
    }
}

export default Main;