import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AUTH0_CLIENT_ID, AUTH0_DOMAIN } from './auth0.config';

ReactDOM.render(
	<App
		clientID={AUTH0_CLIENT_ID}
		domain={AUTH0_DOMAIN}
	/>,
	document.getElementById('root')
);
