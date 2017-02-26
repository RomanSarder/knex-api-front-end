var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var Main = require('Main');


//Load Foundation
require('foundation-sites/dist/css/foundation.min.css');
require('applicationStyles');

ReactDOM.render(
	<p>Boilerplate 3 project</p>,
	document.getElementById('app')
);
