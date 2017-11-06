import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Document extends Component {
	constructor(props) {
		super(props);
		this.state = { showID: false };
	}

	delete(e) {
		e.preventDefault();
		axios.post(process.env.BACKEND + '/documents/delete', {
			ID: this.props.doc.ID
		})
			.then(resp => {
				if (resp.status === 200) {
					console.log(resp.data.message);
					this.props.refreshDocuments();
				}
			})
			.catch(error => {
				console.log('Error adding document:', error.response.data.message)
			})
	}

	showID() {
		this.setState({
			showID: true
		})
	}

	hideID() {
		this.setState({
			showID: false
		})
		this.id.blur();
	}

	render() {
		const doc = this.props.doc;
		return (
			<div onMouseEnter={this.showID.bind(this)} onMouseLeave={this.hideID.bind(this)} >
				<Link to={{ pathname: '/document/' + doc.ID, state: { title: doc.title, content: doc.content, isAuthor: doc.isAuthor } }}>
					<div className="document-li blue">
						<div className="document-icon">
							<img src={process.env.BACKEND + '/icons/document.png'} />
						</div>
						<span>
							{doc.title}
						</span>
						{/* <span className="document-li-id"> {this.state.showID ? doc.ID : ''} </span> */}
						<input type="text" className="document-li-id" value={this.state.showID ? doc.ID : ''} onClick={(e) => { e.preventDefault() }} ref={(ref) => this.id = ref} />
						<div className="document-icon flex-end">
							{doc.isAuthor ? <img src={process.env.BACKEND + '/icons/person.png'} /> : ''}
						</div>
						<div className="document-delete" onClick={this.delete.bind(this)}>
							☓
						</div>
					</div>
				</Link >
			</div >
		)
	}
}
