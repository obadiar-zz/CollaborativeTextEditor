import React from 'react';
import ReactDOM from 'react-dom';
import Document from './Document'
import randomize from 'randomatic';
import { Link } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';

import InputModal from './InputModal';
import ErrorModal from './ErrorModal'
import Logout from './Logout'

class DocumentPortal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documents: [],
			showIDModal: false,
			showPasswordModal: false,
			emptyMessage: '',
			currentID: '',
			showErrorModal: false,
			errorMessage: ''
		}
	}

	getDocuments() {
		axios.get('http://localhost:3000/documents')
			.then(resp => {
				this.setState({
					documents: resp.data.documents,
					emptyMessage: resp.data.documents.length === 0 ? 'You do not have any documents, add or create some.' : ''
				})
			})
			.catch(error => {
				console.log('Error adding document', error.response.data.message)
				this.setState({
					errorMessage: error.response.data.message
				})
				this.openErrorModal();
			})
	}

	componentDidMount() {
		this.getDocuments();
	}

	openIDModal() {
		this.setState({
			showIDModal: true
		})
	}

	closeIDModal() {
		this.setState({
			showIDModal: false
		})
	}

	saveID(value) {
		this.setState({
			currentID: value
		})
		axios.post('http://localhost:3000/documents/add', {
			ID: value
		})
			.then(resp => {
				if (resp.status === 200 && resp.data.success) {
					this.setState({
						documents: [...this.state.documents, resp.data.document],
						emptyMessage: '',
						currentID: ''
					}, () => this.closeIDModal())
				} else {
					this.closeIDModal()
					this.openPasswordModal();
				}
			})
			.catch(error => {
				console.log('Error adding document:', error.response.data.message);
				this.setState({
					errorMessage: error.response.data.message
				})
				this.openErrorModal();
				this.closeIDModal();
			})
	}

	openPasswordModal() {
		this.setState({
			showPasswordModal: true
		})
	}

	closePasswordModal() {
		this.setState({
			showPasswordModal: false
		})
	}

	savePassword(password) {
		axios.post('http://localhost:3000/documents/add', {
			ID: this.state.currentID,
			password: password
		})
			.then(resp => {
				if (resp.status === 200 && resp.data.success) {
					this.setState({
						documents: [...this.state.documents, resp.data.document],
						emptyMessage: ''
					}, () => this.closePasswordModal())
				}
				this.setState({
					currentID: ''
				})
				this.closePasswordModal()
			})
			.catch(error => {
				console.log('Error adding document:', error.response.data.message);
				this.setState({
					currentID: '',
					errorMessage: error.response.data.message
				})
				this.openErrorModal()
				this.closePasswordModal()
			})
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
			<div id="document-portal-container">
				<ErrorModal showModal={this.state.showErrorModal} message={this.state.errorMessage} duration={2} closeModal={this.closeErrorModal.bind(this)} />
				<Logout logout={() => this.props.history.push('/login')} />
				<h1>
					Documents Portal
				</h1>
				<div id="documents-container">
					<div id="empty-message">{this.state.emptyMessage}</div>
					{this.state.documents.map(doc => <Document doc={doc} key={doc.ID} refreshDocuments={this.getDocuments.bind(this)} />)}
				</div>
				<div id="editor-bottom-bar">
					<button className="bottom-button" onClick={this.openIDModal.bind(this)}>Add Document by ID</button>
					<InputModal showModal={this.state.showIDModal} value="" title="ID" type="text" save={this.saveID.bind(this)} closeModal={this.closeIDModal.bind(this)} />
					<InputModal showModal={this.state.showPasswordModal} value="" title="Password" type="password" save={this.savePassword.bind(this)} closeModal={this.closePasswordModal.bind(this)} />
					<Link to={"/document/" + randomize('aA0', 16)}><button className="bottom-button">Create</button></Link>
				</div>
			</div>
		)
	};
}

export default DocumentPortal;