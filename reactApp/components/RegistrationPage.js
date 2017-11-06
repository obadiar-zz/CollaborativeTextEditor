import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Label, FormControl, FieldGroup, ButtonToolbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import ErrorModal from './ErrorModal';

class RegistrationForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { username: '', password: '', showErrorModal: false, errorMessage: '' };

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUsernameChange(event) {
		this.setState({ username: event.target.value });
	}

	handlePasswordChange(event) {
		this.setState({ password: event.target.value });
	}

	handleSubmit(event) {
		axios.post(process.env.BACKEND + '/register', {
			username: this.state.username,
			password: this.state.password
		})
			.then(resp => {
				console.log(resp.data.message);
				if (resp.status === 200) {
					this.props.history.push('/login')
				}
			})
			.catch(error => {
				console.log('Error registering:', error.response.data.message)
				this.setState({
					errorMessage: error.response.data.message
				});
				this.openErrorModal();
			})
		event.preventDefault();
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

	render() {
		return (
			<div id="register-page">
				<ErrorModal showModal={this.state.showErrorModal} message={this.state.errorMessage} duration={2.5} closeModal={this.closeErrorModal.bind(this)} />
				<h1>
					Register
				</h1>
				<form id="register-form">
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
				<span>Already have an account? <Link to="/">Login</Link></span>
			</div>
		);
	}
}

export default RegistrationForm;