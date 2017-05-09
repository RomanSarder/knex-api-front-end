import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from 'actions';
import {push} from 'react-router-redux';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount() {
        let {auth, dispatch} = this.props;
        if (!auth.token) {
            dispatch(actions.setError('You must login.'))
            dispatch(push('/'));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let state = this.refs.state[this.refs.state.selectedIndex].value
        let name = this.refs.name.value;
        let number = this.refs.number.value;
        let {dispatch, auth, params} = this.props;
        this.props.dispatch(actions.updateItem({
            name,
            state,
            number,
            token: auth.token,
            id: params.id
        }));

    }
    render() {
        // let {isLoading, items, match} = this.props;
        // let thisItem = items.filter((item) => {
        //     return item.id === match.params.id
        // });
        let renderLoading = () => {
            // if (isLoading) {
            //     return 'Loading...'
            // } else {
            //     return 'Submit';
            // }
            return 'Submit';
        }
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="email" placeholder="Name" ref="name" />
                    </div>
                    <div className="field">
                        <label>Number</label>
                        <input type="text" name="password" placeholder="Number" ref="number" />
                    </div>
                    <div className="field">
                        <label>State</label>
                        <select name="state" ref="state">
                            <option value="In transit">In transit</option>
                            <option value="In warehouse">In warehouse</option>
                        </select>
                    </div>
                    <button className="form-button" type="submit">{renderLoading()}</button>
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return state;
})(EditForm);