import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Link } from 'react-router-dom';
import Main from 'Main';
import { configure } from 'configureStore';
import * as actions from 'actions';
import { Provider } from 'react-redux'
const store = configure();

//Load Foundation
require('applicationStyles');

render(
	<Provider store={store}>
		<BrowserRouter>
				<Main />
		</BrowserRouter>
	</Provider>
	,
	document.getElementById('app')
);
