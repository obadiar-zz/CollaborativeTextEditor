import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Label, FormControl, FieldGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import ErrorModal from './ErrorModal'

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', showErrorModal: false, errorMessage: '' };

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	openErrorModal() {
		this.setState({
			showErrorModal: true
		})
	}

	closeErrorModal() {
		this.setState({
			showErrorModal: false
		})
	}

	handleUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		axios.post('http://localhost:3000/login', {
			username: this.state.username,
			password: this.state.password
		})
			.then(resp => {
				console.log(resp.data.message);
				if (resp.status === 200) {
					this.props.history.push('/portal')
				}
			})
			.catch(error => {
				console.log('Error logging in:', error)
				this.setState({
					errorMessage: error.response.data.message
				})
				this.openErrorModal();
			})
		event.preventDefault();
	}

	render() {
		return (
			< div id="login-page" >
				<ErrorModal showModal={this.state.showErrorModal} message={this.state.errorMessage} duration={1.5} closeModal={this.closeErrorModal.bind(this)} />
				<h1>
					Login
				</h1>
				<form id="login-form">
					<label>Username</label>
					<FormControl id="username-input" type="text" value={this.state.username} onChange={this.handleUsernameChange} />
					<label>Password</label>
					<FormControl id="password-input" type="password" value={this.state.password} onChange={this.handlePasswordChange} />
					<div id="form-buttons-bar">
						<button className="bottom-button" onClick={this.handleSubmit}>
							Submit
						</button>
					</div>
				</form>
				<span>Don't have an account? <Link to="/register">Register</Link></span>
			</div >
		);
	}
}

export default LoginForm;