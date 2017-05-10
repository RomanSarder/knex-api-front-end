import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';
import { push } from 'react-router-redux';

class EditForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            item: {name: '', state: '', number:0, logs: []}
        };
    }

    componentWillMount() {
        let { dispatch, auth, items, params } = this.props;
        if (!auth.token) {
            dispatch(actions.setError('You must login.'))
            dispatch(push('/'));
        } else {
            let currentItem = items.filter((item) => {
                return item.id === parseInt(params.id);
            })[0];
            this.setState({
                item: currentItem
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let { dispatch, auth, params } = this.props;
        let state = this.refs.state[this.refs.state.selectedIndex].value
        let name = this.refs.name.value;
        let number = this.refs.number.value;
        dispatch(actions.updateItem({
            name,
            state,
            number,
            token: auth.token,
            id: params.id
        }));
        dispatch(push('/dashboard'));

    }
    render() {
        let { isLoading, items, params } = this.props;
        let {item} = this.state;
        let {name, state, logs, number} = this.state.item;
        let renderLogs = () => {
            if (logs.length > 0) {
                let createLogs = logs.filter((item) => item.action === 'Created');
                let stateLogs = logs.filter((item) => item.action === 'State changed');
                let editLogs = logs.filter((item) => item.action === 'Edit');
                let stateLog = stateLogs[stateLogs.length - 1];
                let editLog = editLogs[editLogs.length - 1];
                let createLog = createLogs[createLogs.length - 1];
                return (
                    <div className="logs">
                        <span>{`Created by ${createLog.author}`}</span>
                        <span>{editLog ? `Last edit by ${editLog.author}` : `Last Edit by ${createLog.author}`}</span>
                        <span>{stateLog ? `State changed by ${stateLog.author}` : `State changed by ${createLog.author}`}</span>
                    </div>
                );
            } else {
                return 
            }
            
        }
        return (
            <div className="form-container" id="edit-form-container">
                <form onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Name" ref="name" defaultValue={name} />
                    </div>
                    <div className="field">
                        <label>Number</label>
                        <input type="number" name="number" step="1" placeholder="Number" ref="number" defaultValue={number} />
                    </div>
                    <div className="field">
                        <label>State</label>
                        <select name="state" ref="state" defaultValue={state}>
                            <option value="In transit">In transit</option>
                            <option value="In warehouse">In warehouse</option>
                        </select>
                    </div>
                    <button className="form-button" type="submit">Submit</button>
                    {renderLogs()}
                </form>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        auth: state.auth,
        isLoading: state.isLoading,
        items: state.items
    };
})(EditForm);