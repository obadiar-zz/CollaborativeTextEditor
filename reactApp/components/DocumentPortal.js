import React from 'react';
import ReactDOM from 'react-dom';
import {
	Link
} from 'react-router-dom'
import randomize from 'randomatic';
import axios from 'axios';

class DocumentPortal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			documents: []
		}
	}

	componentDidMount(){
		axios.get('http://localhost:3000/documents')
		.then(resp => {
			this.setState({
				documents: resp.data.documents
			})
		})
	}

	render() {
		return (
			<div id="document-portal-container">
				<h1>
					Documents Portal
				</h1>
				<div id="documents-container">
					<ul>
						{this.state.documents.map(doc => <li key={doc.ID}><Link to={{ pathname: '/document/' + doc.ID, state: { title: doc.title, content: doc.content} }}>{doc.title}</Link></li>)}
					</ul>
				</div>
				<div id="editor-bottom-bar">
					<button className="bottom-button">Add Document by ID</button>
					<Link to={"/document/" + randomize('aA0', 16)}><button className="bottom-button">Create</button></Link>
				</div>
			</div>
		)
	};
}

export default DocumentPortal;