import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from 'Home';
import Dashboard from 'Dashboard';
import EditItemForm from 'EditItemForm';
import NewItemForm from 'NewItemForm';

export class Main extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { auth, error } = this.props;
        let renderError = () => {
            if (error) {
                return (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )
            } else {
                return (<div></div>)
            }
        }
        return (
            <div>
                {renderError()}
                <Route exact={true} path="/" component={Home} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/items/:id/edit" component={EditItemForm} />
                <Route path="/items/new" component={NewItemForm}/>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(Main);