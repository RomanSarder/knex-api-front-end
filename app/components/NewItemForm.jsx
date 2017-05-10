import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import {push} from 'react-router-redux';

class NewItemForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount() {
        let {auth, dispatch} = this.props;
        if (!auth.token) {
            dispatch(push('/'));
            dispatch(actions.setError('You must log in.'));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let {auth, isLoading, dispatch} = this.props;
        let name = this.refs.name.value;
        let number = this.refs.number.value;
        let state = this.refs.state.value;
        let token = auth.token;
        dispatch(actions.createItem({name, number, state, token}));
        dispatch(push('/dashboard'));       
    }
    render() {
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="email" placeholder="Name" ref="name" placeholder="Name of item" required/>
                    </div>
                    <div className="field">
                        <label>Number</label>
                        <input type="number" step="1" name="password" placeholder="Number" ref="number" required/>
                    </div>
                    <div className="field">
                        <label>State</label>
                        <select name="state" ref="state">
                            <option value="In transit">In transit</option>
                            <option value="In warehouse">In warehouse</option>
                        </select>
                    </div>
                    <button className="form-button" type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        auth: state.auth,
        isLoading: state.isLoading
    }
})(NewItemForm);