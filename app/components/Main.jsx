import React, {Component} from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Home from 'Home';
class Main extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        <Link to="/home">Link</Link>
        <Route path="/home" component={Home}/>
        <Route  exact={true} path="/" render={() => <h1>Welcome</h1>}/>
      </div>
    );
  }
}

export default Main;