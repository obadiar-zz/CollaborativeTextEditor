import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Document extends Component {
	constructor(props) {
		super(props);
	}

	delete(e){
		e.preventDefault();
		axios.post('http://localhost:3000/documents/delete', {
			ID: this.props.doc.ID
		})
			.then(resp => {
				if (resp.status === 200){
					console.log(resp.data.message);
					this.props.refreshDocuments();
				}
			})
			.catch(error => {
				console.log('Error adding document:', error.response.data.message)
			})
	}

	render() {
		const doc = this.props.doc;
		return (
			<div>
				<Link to={{ pathname: '/document/' + doc.ID, state: { title: doc.title, content: doc.content} }}>
					<div className="document-li blue" >
						<div className="document-icon">
							<img src="http:/localhost:3000/icons/document.png" />
						</div>
						<span>
							{doc.title}
						</span>
						<div className="document-delete" onClick={this.delete.bind(this)}>
							X
						</div>
					</div>
				</Link>
			</div>
		)
	}
}
