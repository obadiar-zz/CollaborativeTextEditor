import React from 'react';
import ReactDOM from 'react-dom';
import DocumentPortal from './DocumentPortal';
import TextEditor from './TextEditor'
import RegisterationPage from './RegistrationPage'
import LoginPage from './LoginPage'
import { Route, Link, Switch } from 'react-router-dom';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div id='app'>
				<Switch>
					<Route path='/portal' component={DocumentPortal} />
					<Route path='/register' component={RegisterationPage} />
					<Route path="/document/:id" component={TextEditor} />
					{<Route path='/' component={LoginPage} />}
				</Switch>
			</div>
		);
	}
}

export default App;