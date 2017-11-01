import React from 'react';
import ReactDOM from 'react-dom';
import DocumentPortal from './DocumentPortal';
import TextEditor from './TextEditor'
import RegisterationForm from './RegisterationForm'
import LoginForm from './LoginForm'

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			registered: true,
			loggedIn: true
		}
	}

	componentDidMount() {
		this.setState({
			displayComponent: this.state.loggedIn ? <DocumentPortal /> : <LoginForm loginFn={this.loginFn.bind(this)} notRegistered={this.notRegistered.bind(this)} />
		})
	}

	loginFn() {
		this.setState({
			loggedIn: true,
			displayComponent: <DocumentPortal />
		})
	}

	registerFn() {
		this.setState({
			registered: true,
			displayComponent: <LoginForm loginFn={this.loginFn.bind(this)} notRegistered={this.notRegistered.bind(this)} />
		})
	}

	notRegistered() {
		this.setState({
			registered: false,
			displayComponent: <RegisterationForm registerFn={this.registerFn.bind(this)} />
		})
	}

	render() {
		return (
			<div id='app'>
				{this.state.displayComponent}
			</div>
		);
	}
}

export default App;