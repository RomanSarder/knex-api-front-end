import React from 'react';
import { render } from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Main from 'Main';
import Home from 'Home';
import Dashboard from 'Dashboard';
import EditForm from 'EditForm';
import NewItemForm from 'NewItemForm';
import RegisterForm from 'RegisterForm';
import { configure } from 'configureStore';
import * as actions from 'actions';
import { Provider } from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux';

const store = configure();
const history = syncHistoryWithStore(browserHistory, store);

require('applicationStyles');

render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={Main}>
				<IndexRoute component={Home}/>
				<Route path='/register' component={RegisterForm}/>
				<Route path='/dashboard' component={Dashboard}/>
				<Route path='/items/:id/edit' component={EditForm}/>
				<Route path='/items/new' component={NewItemForm}/>
			</Route>
		</Router>
	</Provider>
	,
	document.getElementById('app')
);
