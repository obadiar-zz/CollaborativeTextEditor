import React from 'react';
import ReactDOM from 'react-dom';
import Document from './Document'
import randomize from 'randomatic';
import { Link } from 'react-router-dom';
import axios from 'axios';

import InputModal from './InputModal';
import Logout from './Logout'

class DocumentPortal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documents: [],
			showModal: false,
			emptyMessage: ''
		}
	}

	componentDidMount() {
		setTimeout(this.noMessages.bind(this), 1500)
		axios.get('http://localhost:3000/documents')
			.then(resp => {
				this.setState({
					documents: resp.data.documents
				})
			})
			.catch(error => {
				console.log('Error adding document', error.response.data.message)
			})
	}

	openModal() {
		this.setState({
			showModal: true
		})
	}

	closeModal() {
		this.setState({
			showModal: false
		})
	}

	saveID(value) {
		axios.post('http://localhost:3000/documents/add', {
			ID: value
		})
			.then(resp => {
				this.setState({
					documents: [...this.state.documents, resp.data.document],
                    emptyMessage: ''
				}, () => this.closeModal())
			})
			.catch(error => {
				console.log('Error adding document:', error.response.data.message)
			})
	}

	noMessages() {
		if (this.state.documents.length === 0)
			this.setState({
				emptyMessage: 'You have no documents, You can Create or Add using the buttons below.'
			})
	}

	render() {
		return (
			<div id="document-portal-container">
				<Logout logout={() => this.props.history.push('/login')} />
				<h1>
					Documents Portal
				</h1>
				<div id="documents-container">
					<div id="empty-message">{this.state.emptyMessage}</div>
					{this.state.documents.map(doc => <Document doc={doc} key={doc.ID} />)}
				</div>
				<div id="editor-bottom-bar">
					<button className="bottom-button" onClick={this.openModal.bind(this)}>Add Document by ID</button>
					<InputModal showModal={this.state.showModal} value="" title='Enter ID' type="text" save={this.saveID.bind(this)} />
					<Link to={"/document/" + randomize('aA0', 16)}><button className="bottom-button">Create</button></Link>
				</div>
			</div>
		)
	};
}

export default DocumentPortal;