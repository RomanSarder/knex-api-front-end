import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Main from 'Main';
import Home from 'Home';
import Dashboard from 'Dashboard';
import EditItemForm from 'EditItemForm';
import NewItemForm from 'NewItemForm';
import { configure } from 'configureStore';
import * as actions from 'actions';
import { Provider } from 'react-redux'
const store = configure();

//Load Foundation
require('applicationStyles');

render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={Home}/>
				<Route path='/dashboard' component={Dashboard}/>
				<Route path='/items/:id/edit' component={EditItemForm}/>
				<Route path='/items/new' component={NewItemForm}/>
			</Route>
		</Router>
	</Provider>
	,
	document.getElementById('app')
);
