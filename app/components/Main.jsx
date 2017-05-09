import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => {
        return state;
    }
)(Main);