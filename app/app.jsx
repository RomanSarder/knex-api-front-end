import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Match, Link} from 'react-router-dom';
import Main from 'Main';
import {configure} from 'configureStore';
const store = configure();


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
