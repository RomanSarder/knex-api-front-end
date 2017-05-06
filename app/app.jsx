import React from 'react';
import {render} from 'react-dom';
import Main from 'Main';
import {BrowserRouter, Match, Link} from 'react-router-dom';


//Load Foundation
require('foundation-sites/dist/css/foundation.min.css');
require('applicationStyles');

render(
	<BrowserRouter>
		<div>
			<Main />
		</div>
	</BrowserRouter>,
	document.getElementById('app')
);
