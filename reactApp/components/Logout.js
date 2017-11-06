import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';

export default class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			pressed: false
		};
	}

	logout() {
		axios.get(process.env.BACKEND + '/logout')
			.then(resp => {
				console.log(resp.data.message)
				this.props.logout()
			})
			.catch(error => {
				console.log('Error logging out:', error)
			})
	}

	render() {
		return (
			<button id="logout" onClick={this.logout.bind(this)}><span>Logout</span></button>
		)
	}
}
