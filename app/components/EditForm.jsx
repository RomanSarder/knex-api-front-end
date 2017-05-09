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
        let {dispatch, auth} = this.props;
        if (!auth.token) {
            dispatch(actions.setError('You must login.'))
            dispatch(push('/'));
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        let {dispatch, auth, params} = this.props;
        let state = this.refs.state[this.refs.state.selectedIndex].value
        let name = this.refs.name.value;
        let number = this.refs.number.value;
        this.props.dispatch(actions.updateItem({
            name,
            state,
            number,
            token: auth.token,
            id: params.id
        }));

    }
    render() {
        let {isLoading, items, params} = this.props;
        let currentItem = items.filter((item) => {
            console.log(typeof item.id);
            return item.id === parseInt(params.id);
        })[0];
        // Create object to prevent error 'cannot read prop of undefined'
        // when user types this component's url directly
        let formInfo = {
            name: currentItem ? currentItem.name : '',
            number: currentItem ? currentItem.number : '',
            state: currentItem ? currentItem.state : ''
        };
        return (
            <div className="form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="email" placeholder="Name" ref="name" defaultValue={formInfo.name}/>
                    </div>
                    <div className="field">
                        <label>Number</label>
                        <input type="text" name="password" placeholder="Number" ref="number" defaultValue={formInfo.number} />
                    </div>
                    <div className="field">
                        <label>State</label>
                        <select name="state" ref="state" defaultValue={formInfo.state}>
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
    return state;
})(EditForm);