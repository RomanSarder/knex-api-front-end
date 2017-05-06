import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Link} from 'react-router-dom';
import Main from 'Main';
import {configure} from 'configureStore';
import * as actions from 'actions';
const store = configure();
store.dispatch(actions.login('roman@ya.ru213', '123'));

//Load Foundation
require('applicationStyles');

render(
	<BrowserRouter>
		<div>
			<Main/>
		</div>
	</BrowserRouter>,
	document.getElementById('app')
);
